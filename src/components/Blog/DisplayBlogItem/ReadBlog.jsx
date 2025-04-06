import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { withRouter } from 'react-router-dom';
import { 
  CompositeDecorator,
  convertFromRaw,
  Editor,
  EditorState,
} from 'draft-js';
import PrismDecorator from 'draft-js-prism';
import Prism from 'prismjs';
import MultiDecorator from 'draft-js-multidecorators';
/////////////////////////////////////////// COMPONENTS 
import DisplayTitleComponent from './DisplayTitleComponent';
import LoadingComponent from '../../Loading/LoadingComponent';
import LinkComponent from '../../Editor/LinkComponent'
/////////////////////////////////////////////////////// STYLE MAP FUNCTION
const styleMap = {
  'CODE': {
    // color: '#c7254e',
		background: '#f9f2f4',
		fontSize: '90%',
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 4,
		paddingRight: 4,
  },
	'LINK': {
		color: 'red',
		'cursor': 'pointer'
	}
}

function ReadBlog(props) {
  const [blog, setBlog] = useState(null);
  /////////////////////////////////////////////////////////////// DECORATORS
  const compositeDecorator = new CompositeDecorator([{
    strategy: findLinkEntities,
    component: LinkComponent,
  }]);
  const prismDecorator = new PrismDecorator({
    prism: Prism,
    defaultSyntax: "javascript"
  });
  const decorator = new MultiDecorator([prismDecorator, compositeDecorator])
  ///////////////////////////////////////////////////////// STATE VARIABLES
  const [editorState, setEditorState] = useState(() => 
    EditorState.createEmpty(decorator)
  );
  
  useEffect(() => {
    const { id } = props.match.params;
    const { history } = props;
    firebase
      .database()
      .ref(`/allBlogs/${id}`)
      .once('value')
      .then(snap => {
        if(!snap.exists()) {
          history.push('/no-match')
        } else {
          const { title, subtitle, editorData, imageURL, 
            imageName, publishedAt, likes, author, readTime } = snap.val();
          setBlog({
            title, subtitle, imageURL, imageName, editorData, publishedAt,
            likes: likes ? likes : 0, author, readTime
          });
          if(editorData) {
            let contentState = convertFromRaw(JSON.parse(editorData));
            const newEditorState = EditorState.push(editorState, contentState);
            setEditorState(newEditorState);
          }
        }
      })
      .catch(error => console.error(error));
  }, []) 

  const blockStyleFn = contentBlock => {
		const type = contentBlock.getType();
		switch (type) {
			case 'unstyled':
				return 'unstyled'
				break;
			case 'header-two':
				return 'title'
				break
			case 'header-three':
				return 'title'
				break;
			case 'code-block':
				return 'code'
				break;
			case 'blockquote':
				return 'blockquote'
				break;
			case 'unordered-list-item':
				return 'unordered-list-item'
				break;
			default:

		}
	}

  return (
    <div className="col col-xl-6 offset-xl-3 col-lg-6 offset-lg-3">
      {!blog ?
        <LoadingComponent />
        :
        <div>
          
          <DisplayTitleComponent
            blogID={props.match.params.id}
            title={blog ? blog.title : ''}
            subtitle={blog ? blog.subtitle : ''}
            imageURL={blog ? blog.imageURL : ''}
            currentUser={props.currentUser}
            editorData={blog ? blog.editorData : ''}
            imageName={blog ? blog.imageName : ''}
            publishedAt={blog ? blog.publishedAt: ''}
            readTime={blog ? blog.readTime: ''}
            likes={blog ? blog.likes : 0}
            author={blog ? blog.author : ''}
          />
          <Editor 
            blockStyleFn={blockStyleFn}
            customStyleMap={styleMap}
            editorState={editorState}
            readOnly={true}
          />
        </div>
      }    
    </div>
  )
}

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

export default withRouter(ReadBlog);