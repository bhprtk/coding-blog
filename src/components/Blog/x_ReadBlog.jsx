import React, { Component } from 'react'
import firebase from 'firebase'
import Card from '@material-ui/core/Card';
import { withRouter } from 'react-router-dom'

import { 
  CompositeDecorator,
  convertFromRaw,
  Editor,
  EditorState,
} from 'draft-js'

import CodeBlock from './CodeBlock'
import DisplayTitleComponent from './DisplayTitleComponent'
import LinkComponent from '../Editor/LinkComponent'
import LoadingComponent from '../Loading/LoadingComponent';

const styleMap = {
  'CODE': {
    color: '#c7254e',
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


class ReadBlog extends Component {

  state = {
    blog: null,
    editorState: EditorState.createEmpty(new CompositeDecorator([
			{
				strategy: findLinkEntities,
				component: LinkComponent,
			},
    	])),
  }

  componentWillMount() {
    const { id } = this.props.match.params
    const { history } = this.props
    firebase
      .database()
      .ref(`/allBlogs/${id}`)
      .once('value')
      .then(snap => {
        if(!snap.val()) {
          history.push('/no-match')
        } else {
          const { title, subtitle, editorData, imageURL, imageName, publishedAt, likes, author } = snap.val()
          this.setState({
            blog: {
              title, subtitle, imageURL, imageName, editorData, publishedAt,
              likes: likes ? likes : 0, author
            }
          })
          if(editorData) {
            let contentState = convertFromRaw(JSON.parse(editorData))
            const editorState = EditorState.push(this.state.editorState, contentState)
            this.setState({ editorState })
          }
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  _blockRendererFn = contentBlock => {
    const type = contentBlock.getType()
    const text = contentBlock.getText()
    switch(type) {
      case 'code-block':
        return ({
          component: CodeBlock,
          editable: false,
        })
        break
      default:
        break
    }
  }

  _blockStyleFn = contentBlock => {
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

  render() {
    const { blog } = this.state
    return (
      <div className="col col-xl-6 offset-xl-3 col-lg-6 offset-lg-3">
        {!blog ?
          <LoadingComponent />
          :
          <div>
            <DisplayTitleComponent
              blogID={this.props.match.params.id}
              title={blog ? blog.title : ''}
              subtitle={blog ? blog.subtitle : ''}
              imageURL={blog ? blog.imageURL : ''}
              currentUser={this.props.currentUser}
              editorData={blog ? blog.editorData : ''}
              imageName={blog ? blog.imageName : ''}
              publishedAt={blog ? blog.publishedAt: ''}
              likes={blog ? blog.likes : 0}
              author={blog ? blog.author : ''}
            />
            <Editor 
              blockStyleFn={this._blockStyleFn}
              blockRendererFn={this._blockRendererFn}
              customStyleMap={styleMap}
              editorState={this.state.editorState}
              readOnly={true}
            />
            <hr/>
          </div>
        }
      </div>
    )
  }
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

export default withRouter(ReadBlog)