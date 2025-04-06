import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app'
import {
  CompositeDecorator,
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding,
} from 'draft-js';
// import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
const imagePlugin = createImagePlugin();

import CodeUtils from 'draft-js-code'
import PrismDecorator from 'draft-js-prism'
import Prism from 'prismjs'
import MultiDecorator from 'draft-js-multidecorators'

import '../../styles/prism-github.css'
// import '../../styles/prism-github-light.css'
// import '../../styles/prism-tomorrow.css'

/////////////////////////////////////////// COMPONENTS 

import LinkComponent from './LinkComponent'
import PublishButton from './PublishButton'
import TextToolbar from './TextToolbar'
import TitleComponent from './TitleComponent'
import LoadingComponent from '../Loading/LoadingComponent'
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

function EditorComponent(props) {
  /////////////////////////////////////////////////////////////// PROPS
  const { currentUser } = props;
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
  // const [currentInlineStyle, setCurrentInlineStyle] = useState('');
  const [currentLinkKey, setCurrentLinkKey] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [currentImageName, setCurrentImageName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saveDraft, setSaveDraft] = useState(false);
  const [readTime, setReadTime] = useState(0);

  useEffect(() => {
    // Get the blog id from params
    const { id } = props.match.params;
    // Get the user id from currentuser props
    const { uid } = props.currentUser.userData;
    // Check if the draft already exists
    firebase
      .database()
      .ref(`users/${uid}/drafts/${id}`)
      .once('value')
      .then(snap => {
        // If the draft already exists
        if (snap.exists()) {
          // Get data from the existing draft
          const { title, subtitle, editorData, imageURL, imageName, saved,
            publishedAt } = snap.val();
          console.log('title: ', title)
          console.log('publishedAt: ', publishedAt)
          setTitle(title);
          setSubtitle(subtitle);
          setImageURL(imageURL);
          setPublishedAt(publishedAt);
          setCurrentImageName(imageName);
          setSaveDraft(saved);

          if (editorData) {
            let contentState = convertFromRaw(JSON.parse(editorData))
            const newEditorState = EditorState.push(editorState, contentState)
            onChange(newEditorState);
            setLoading(false);
          }
        } else {
          // Create a new draft
          firebase
            .database()
            .ref(`allBlogs/${id}`)
            .once('value')
            .then(snap => {
              const { blogID,
                title,
                subtitle,
                imageURL,
                editorData,
                imageName,
                publishedAt,
                likes,
                author } = snap.val();
              firebase
                .database()
                .ref(`users/${uid}/drafts/${id}`)
                .set({
                  editorData,
                  imageName,
                  imageURL,
                  subtitle,
                  title,
                  publishedAt,
                  likes,
                  author,
                  saved: false
                })
              setTitle(title);
              setSubtitle(subtitle);
              setImageURL(imageURL);
              setCurrentImageName(imageName);
              if (editorData) {
                let contentState = convertFromRaw(JSON.parse(editorData))
                const newEditorState = EditorState.push(editorState, contentState)
                onChange(newEditorState);
                setLoading(false);
              }
            })
            .catch(error => console.error(error));
        }
      })
      .catch(error => console.error(error));
    return () => {
      const { id } = props.match.params;
      const { uid } = props.currentUser.userData;
      firebase
        .database()
        .ref(`/users/${uid}/drafts/${id}/saved`)
        .once('value')
        .then(snap => {
          if (!snap.val()) {
            deleteDraftFromFirebase(id, uid);
          }
        })
    }
  }, [])

  const getWordCount = plainText => {
    const regex = /(?:\r\n|\r|\n)/g;  // new line, carriage return, line feed
    const cleanString = plainText.replace(regex, ' ').trim(); // replace above characters w/ space
    const wordArray = cleanString.match(/\S+/g);  // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  }

  /////////////////////////////////////////////// EDITOR ON CHANGE FUNCTION
  const onChange = newEditorState => {
    const { id } = props.match.params
    const contentState = newEditorState.getCurrentContent()
    if (contentState !== editorState.getCurrentContent()) {
      console.log("content has changed")
    }
    const rawData = convertToRaw(contentState)
    // const currentInlineStyle = newEditorState.getCurrentInlineStyle()
    const selectionState = newEditorState.getSelection();
    const startKey = selectionState.getStartKey();
    const startOffset = selectionState.getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

    const anchorKey = selectionState.getAnchorKey();
    const currentContent = newEditorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);

    // console.log('currentContent: ', typeof currentContent)
    ///////////////////////////////////////////////// GET READING TIME
    const plainText = currentContent.getPlainText('')
    const wordCount = getWordCount(plainText)
    const readTime = Math.ceil(wordCount / 265)
    setReadTime(readTime)

    if (contentState.hasText()) {
      saveToFirebase(rawData, id, props.currentUser.userData.uid, readTime)
    }

    setEditorState(newEditorState);
    // setCurrentInlineStyle(selectedText ? currentInlineStyle.toJS() : '');
    setCurrentLinkKey(selectedText ? linkKey : '');
  }
  /////////////////////////////////////////////////////// BLOCKSTYLE FUNCTION
  const blockStyleFn = contentBlock => {
    const type = contentBlock.getType();
    switch (type) {
      case 'unstyled':
        return 'unstyled'
        break;
      case 'header-two':
        return 'title'
        break;
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
  /*************************************************** CODE UTILS FUNCTIONS */

  /////////////////////////////////////////////////////// KEY BINDING FUNCTION
  const keyBindingFn = event => {
    if (event.keyCode === 9 /* TAB */) {
      onChange(CodeUtils.onTab(event, editorState));
      return;
    }
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return getDefaultKeyBinding(event);
    }
    const command = CodeUtils.getKeyBinding(event);
    return command || getDefaultKeyBinding(event);
  }
  /////////////////////////////////////////////////////// HANDLE KEY COMMAND
  const handleKeyCommand = command => {
    let newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  /////////////////////////////////////////////////////// HANDLE RETURN
  const handleReturn = event => {
    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return 'not-handled';
    }
    onChange(CodeUtils.handleReturn(event, editorState));
    return 'handled';
  }
  /******************************************* END OF CODE UTILS FUNCTIONS */

  /////////////////////////////////////////////////////////////////// RENDER
  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <div className="col-xl-6 offset-xl-3 col-lg-6 offset-lg-3">
        <TextToolbar
          editorState={editorState}
          setEditorState={setEditorState}
          onChange={onChange}
          currentUser={props.currentUser}
          currentLinkKey={currentLinkKey}
        />
        <TitleComponent
          title={title}
          subtitle={subtitle}
          imageURL={imageURL}
          publishedAt={publishedAt}
          readTime={readTime}
          uid={props.currentUser.userData.uid}
          id={props.match.params.id}
          // currentImageName={currentImageName}
        />
        <Editor
          blockStyleFn={blockStyleFn}
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={onChange}
          keyBindingFn={keyBindingFn}
          handleKeyCommand={handleKeyCommand}
          handleReturn={handleReturn}
          plugins={[imagePlugin]}
        />
        <hr />
        <PublishButton
          uid={currentUser.userData.uid}
          draftID={props.match.params.id}
          userName={currentUser.userData.displayName}
          setSaveDraft={setSaveDraft}
        />
      </div>
    )
  }
}

function saveToFirebase(data, id, uid, readTime) {
  firebase
    .database()
    .ref(`/users/${uid}/drafts/${id}/editorData`)
    .set(JSON.stringify(data))
  firebase
    .database()
    .ref(`/users/${uid}/drafts/${id}/readTime`)
    .set(readTime)
}

function deleteDraftFromFirebase(id, uid) {
  firebase
    .database()
    .ref(`/users/${uid}/drafts/${id}`)
    .remove()
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
export default withRouter(EditorComponent)