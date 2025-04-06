import React, { Component } from 'react'
import {
	CharacterMetadata,
	CompositeDecorator,
	ContentBlock,
	ContentState,
	Editor,
	EditorState,
	Entity,
	Modifier,
	RichUtils,
	convertFromRaw,
	convertToRaw,
	getDefaultKeyBinding,
} from 'draft-js'
import CodeUtils from 'draft-js-code'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'

///////////////// COMPONENTS //////////////////////////
import AddLinkDialog from './AddLinkDialog'
import DeleteBlogDialog from '../DeleteBlogDialog/DeleteBlogDialog'
import LinkComponent from './LinkComponent'
import PublishButton from './PublishButton'
import TextToolbar from './TextToolbar'
import TitleComponent from './TitleComponent'
///////////////////////////////////////////////////////


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

class EditorComponent extends Component {
	state = {
		editorState: EditorState.createEmpty(new CompositeDecorator([
			{
				strategy: findLinkEntities,
				component: LinkComponent,
			},
    	])),
		currentBlock: '',
		currentLinkValue: '',
		newImage: '',
		openAddLinkDialog: false,
		title: '',
		subtitle: '',
		imageURL: '',
		currentLinkKey: '',
		currentInlineStyle: '',
		currentImageName: '',
		currentUser: null,
		openDeleteBlogDialog: false
	}

	componentWillUnmount() {
		const { id } = this.props.match.params
		const { title, subtitle, imageURL, currentImageName, editorState } = this.state
		const contentState = editorState.getCurrentContent()

		const temp = { title, subtitle, imageURL, currentImageName }

		if(Object.values(temp).every(item => !item) && !contentState.hasText()) {
			deleteDraftFromFirebase(id, this.state.currentUser.userData.uid)
		}
	}

	componentWillMount() {
    const { id } = this.props.match.params
    const { uid } = this.props.currentUser.userData
		getData(id, uid)
      .then(({ title, subtitle, editorData, imageURL, imageName }) => {
        this.setState({ title, subtitle, imageURL, currentImageName: imageName })
        if(editorData) {
          let contentState = convertFromRaw(JSON.parse(editorData))
          const editorState = EditorState.push(this.state.editorState, contentState)
          this._onChange(editorState)
        }
      })
      .catch(error => console.log ('error:', error))
	}

	componentDidMount() {
		const { id } = this.props.match.params
		const uploadImage = document.getElementById('uploadImage')

		//////////////// UPLOAD IMAGE EVENT LISTENER ///////////////////
		uploadImage.addEventListener('change', e => {

			if(this.state.currentImageName) {
				deleteImageFromFirebase(this.state.currentImageName, this.state.currentUser.uid)
				deleteImageNameFromFirebase(id, this.state.currentUser.uid)
			}

			const image = e.target.files[0]
			uploadImageToFirebase(image, this.state.currentUser.uid)
				.then(imageURL => {
					saveImageToFirebase(imageURL, id, this.state.currentUser.uid)
					saveImageNameToFirebase(image.name, id, this.state.currentUser.uid)
					this.setState({
						imageURL,
						currentImageName: image.name
					})
				})
				.catch(err => console.log ('err:', err))
		})
		///////////////////////////////////////////////////////////////////

	}

	////////////// UPLOAD IMAGE ////////////////////////
	_insertImage = e => {
		document.getElementById("uploadImage").click()
		// this._onChange(RichUtils.toggleBlockType(this.state.editorState, 'image'))
	}


	_clickImage = () => this.setState({ currentBlock: 'image' })



  /////////////////////////////////////////// ON CHANGE EDITOR
	_onChange = editorState => {
		const { id } = this.props.match.params
		const type = RichUtils.getCurrentBlockType(editorState)
		const contentState = editorState.getCurrentContent()
		const rawData = convertToRaw(contentState)
		const currentInlineStyle = editorState.getCurrentInlineStyle()


		const selectionState = editorState.getSelection();
		const startKey = selectionState.getStartKey();
		const startOffset = selectionState.getStartOffset();
		const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
		const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

		const anchorKey = selectionState.getAnchorKey();
		const currentContent = editorState.getCurrentContent();
		const currentContentBlock = currentContent.getBlockForKey(anchorKey);
		const start = selectionState.getStartOffset();
		const end = selectionState.getEndOffset();
		const selectedText = currentContentBlock.getText().slice(start, end);

		if(contentState.hasText()) {
			saveToFirebase(rawData, id, this.props.currentUser.userData.uid)
		}
		this.setState({
			editorState,
			currentBlock: type,
			currentInlineStyle: selectedText ? currentInlineStyle.toJS() : '' ,
			currentLinkKey: selectedText ? linkKey : ''
		})
	}

	/////////////////// DELETE DRAFT ////////////////////////

	_deleteDraft = () => {
		this.setState({ openDeleteBlogDialog: true })
	}

	_closeDeleteBlogDialog = () => {
		this.setState({ openDeleteBlogDialog: false })
	}

	_confirmDeleteBlog = () => {
		const { history } = this.props
		const draftID = this.props.match.params.id
		const { uid } = this.state.currentUser
		deleteDraftFromFirebase(draftID, uid)
		history.push('/drafts')
	}

	////////////////////////////////////////////////////////

	///////////// TITLE AND SUBTITLE /////////////////
	_handleTitleChange = (event, newValue) => {
		const { id } = this.props.match.params
		this.setState({ title: newValue })
		saveTitleToFirebase(newValue, id, this.state.currentUser.uid)
	}

	_handleSubtitleChange = (event, newValue) => {
		const { id } = this.props.match.params
		this.setState({ subtitle: newValue })
		saveSubtitleToFirebase(newValue, id, this.state.currentUser.uid)
	}
	//////////////////////////////////////////////////

	///////////// CREATE LINK ////////////////////////
	_createLink = () => {
		const { editorState } = this.state
		const selectionState = editorState.getSelection()
		const contentState = editorState.getCurrentContent();
		const startKey = selectionState.getStartKey();
		const startOffset = selectionState.getStartOffset();
		const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
		const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
			let url = '';
		if (linkKey) {
		const linkInstance = contentState.getEntity(linkKey);
		url = linkInstance.getData().url;
		}
		if(!selectionState.isCollapsed()) {
			this.setState({
				openAddLinkDialog: true,
				currentLinkValue: url
			})
		}
	}

	_onChangeLinkValue = (event, newValue) => {
		this.setState({ currentLinkValue: newValue })
	}

	_submitLink = () => {
		const { currentLinkValue, editorState } = this.state
		const selectionState = editorState.getSelection()
		if(currentLinkValue) {
			this._confirmLink(currentLinkValue)
		} else {
			this._onChange(RichUtils.toggleLink(editorState, selectionState, null))
		}
		this.closeAddLinkDialog()
	}

	_confirmLink = linkValue => {
		const { editorState } = this.state
		const contentState = editorState.getCurrentContent()
		const contentStateWithEntity = contentState.createEntity(
			'LINK',
			'MUTABLE',
			{ url: linkValue }
	 	)
		const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
 	 	const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
		this._onChange(RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    ))
	}

	closeAddLinkDialog = () => this.setState({
		openAddLinkDialog: false,
		currentLinkValue: ''
	})
  ////////////////////////////////////////////////////
  

	_toggleTitle = () => {
		this._onChange(RichUtils.toggleBlockType(this.state.editorState, 'header-three'))
	}

	_toggleParagraph = () => {
		this._onChange(RichUtils.toggleBlockType(this.state.editorState, 'unstyled'))
	}

	_toggleCodeBlock = () => {
		// this._onChange(RichUtils.toggleBlockType(this.state.editorState, 'code'))
		this._onChange(RichUtils.toggleCode(this.state.editorState))
	}

	_toggleBlockquote = () => {
		this._onChange(RichUtils.toggleBlockType(this.state.editorState, 'blockquote'))
	}

	_toggleUnorderedListItem = () => {
		this._onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'))
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

	//////////////// CODE FORMATTING /////////////////////////////

	handleKeyCommand = (command) => {
	 const { editorState } = this.state;
	 let newState;

	 if (CodeUtils.hasSelectionInBlock(editorState)) {
		 newState = CodeUtils.handleKeyCommand(editorState, command);
	 }

	 if (!newState) {
		 newState = RichUtils.handleKeyCommand(editorState, command);
	 }

	 if (newState) {
		 this._onChange(newState);
		 return 'handled';
	 }
	 return 'not-handled';
 }

 keyBindingFn = (evt) => {
	 const { editorState } = this.state;
	 if (!CodeUtils.hasSelectionInBlock(editorState)) return getDefaultKeyBinding(evt);

	 const command = CodeUtils.getKeyBinding(evt);

	 return command || getDefaultKeyBinding(evt);
 }

 handleReturn = (evt) => {
	 const { editorState } = this.state;
	 if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

	 this._onChange(CodeUtils.handleReturn(evt, editorState));
	 return 'handled';
 }

 onTab = (evt) => {
	 const { editorState } = this.state;
	 if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

	 this._onChange(CodeUtils.onTab(evt, editorState));
	 return 'handled';
 }

 ///////////////////////////////////////////////////////////////////

	render() {
		return (
      <div className="col-xl-6 offset-xl-3 col-lg-6 offset-lg-3">
        <TextToolbar
          toggleTitle={this._toggleTitle}
          toggleCodeBlock={this._toggleCodeBlock}
          currentBlock={this.state.currentBlock}
          toggleParagraph={this._toggleParagraph}
          toggleBlockquote={this._toggleBlockquote}
          toggleUnorderedListItem={this._toggleUnorderedListItem}
          createLink={this._createLink}
          currentLinkKey={this.state.currentLinkKey}
					deleteDraft={this._deleteDraft}
        />
        <hr/>
        <TitleComponent
          title={this.state.title}
          subtitle={this.state.subtitle}
          imageURL={this.state.imageURL}
          handleTitleChange={this._handleTitleChange}
          handleSubtitleChange={this._handleSubtitleChange}
          insertImage={this._insertImage}
        />
        <Editor
          blockStyleFn={this._blockStyleFn}
          // blockRendererFn={this._blockRendererFn}
          customStyleMap={styleMap}
          editorState={this.state.editorState}
          onChange={this._onChange}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          handleReturn={this.handleReturn}
					onTab={this.onTab}
					spellCheck={true}
        />
        <hr/>
				<PublishButton 
					uid={this.state.currentUser ? this.state.currentUser.uid : null}
					draftID={this.props.match.params.id}
					userName={this.state.currentUser ? this.state.currentUser.displayName : null}
				/>
				<hr/>
        <AddLinkDialog
          open={this.state.openAddLinkDialog}
          close={this.closeAddLinkDialog}
          confirmLink={this._confirmLink}
          currentLinkValue={this.state.currentLinkValue}
          onChangeLinkValue={this._onChangeLinkValue}
          submitLink={this._submitLink}
        />
				<DeleteBlogDialog 
					open={this.state.openDeleteBlogDialog}
					close={this._closeDeleteBlogDialog}
					confirmDeleteBlog={this._confirmDeleteBlog}
				/>
      </div>
		)
	}
}

const saveToFirebase = ( data, id, uid ) => {
	firebase
		.database()
		.ref(`/users/${uid}/drafts/${id}/editorData`)
		.set(JSON.stringify(data))
}

const getData = (id, uid) => (
	firebase
		.database()
		.ref(`/users/${uid}/drafts/${id}`)
		.once('value')
		.then(snap => snap.val())
		.catch(err => console.log ('err:', err))
)

const saveTitleToFirebase = (title, id, uid) => {
	firebase
		.database()
		.ref(`/users/${uid}/drafts/${id}/title`)
		.set(title)
}

const saveSubtitleToFirebase = (subtitle, id, uid) => {
	firebase
		.database()
		.ref(`/users/${uid}/drafts/${id}/subtitle`)
		.set(subtitle)
}

const deleteDraftFromFirebase = (id, uid) => {
	firebase
		.database()
		.ref(`/users/${uid}/drafts/${id}`)
		.remove()
}

const uploadImageToFirebase = (image, uid) => (
	firebase
		.storage()
		.ref(`/users/${uid}/uploadedImages/${image.name}`)
		.put(image)
		.then(snap => snap.metadata.downloadURLs[0])
		.catch(err => console.log ('err:', err))
)

const saveImageToFirebase = (imageURL, id, uid) => (
	firebase
		.database()
		.ref(`/users/${uid}/drafts/${id}/imageURL`)
		.set(imageURL)
)

const saveImageNameToFirebase = (imageName, id, uid) => (
	firebase
		.database()
		.ref(`/users/${uid}/drafts/${id}/imageName`)
		.set(imageName)
)

const deleteImageFromFirebase = (imageName, uid) => (
	firebase
		.storage()
		.ref(`/users/${uid}/uploadedImages/${imageName}`)
		.delete()
)

const deleteImageNameFromFirebase = (id, uid) => (
	firebase
		.database()
		.ref(`/users/${uid}/drafts/${id}/imageName`)
		.set('')
)

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
