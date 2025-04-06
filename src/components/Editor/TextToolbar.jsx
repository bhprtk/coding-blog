import React, { useState } from 'react'
import firebase from 'firebase/app'
import { withRouter } from 'react-router-dom'
import { RichUtils } from 'draft-js';
///////////////////////////////////////////////////////// MATERIAL UI CORE
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
///////////////////////////////////////////////////////// MATERIAL UI ICONS
import TitleIcon from '@material-ui/icons/Title';
import CodeIcon from '@material-ui/icons/Code';
import BlockquoteIcon from '@material-ui/icons/FormatQuote';
import UnorderedListItemIcon from '@material-ui/icons/FormatListBulleted';
import ParagraphIcon from '@material-ui/icons/FormatAlignLeft';
import DeleteIcon from '@material-ui/icons/DeleteForever'
//////////////////////////////////////////////////////////////// COMPONENTS
import DeleteBlogDialog from '../DeleteBlogDialog/DeleteBlogDialog'
import CreateLinkButton from './CreateLinkButton';
////////////////////////////////////////////////////////////////// CONSTANTS
const selected = "#fff"
const notSelected = "#757575"

function TextToolbar(props) {
  ////////////////////////////////////////////////////////////// TOGGLE BUTTONS
  const { editorState, onChange } = props;
  const type = RichUtils.getCurrentBlockType(editorState)
  const toggleTitle = () => {
		onChange(RichUtils.toggleBlockType(editorState, 'header-three'))
	}
	const toggleParagraph = () => {
		onChange(RichUtils.toggleBlockType(editorState, 'unstyled'))
	}
	const toggleCodeBlock = () => {
		onChange(RichUtils.toggleCode(editorState))
	}
	const toggleBlockquote = () => {
		onChange(RichUtils.toggleBlockType(editorState, 'blockquote'))
	}
	const toggleUnorderedListItem = () => {
		onChange(RichUtils.toggleBlockType(editorState, 'unordered-list-item'))
  }
  ///////////////////////////////////////////////////////////////// DELETE BLOG
  const [openDeleteBlogDialogVar, setOpenDeleteBlogDialogVar] = useState(false)
  const openDeleteBlogDialogFn = () => {
    setOpenDeleteBlogDialogVar(true);
  }
  const closeDeleteBlogDialogFn = () => {
    setOpenDeleteBlogDialogVar(false);
  }
  const confirmDeleteBlogFn = () => {
    const { history } = props
		const draftID = props.match.params.id
		const { uid } = props.currentUser.userData
		deleteDraftFromFirebase(draftID, uid)
		history.push('/drafts')
  }
  const deleteDraftFromFirebase = (id, uid) => {
    firebase
      .database()
      .ref(`/users/${uid}/drafts/${id}`)
      .remove()
  }
  ////////////////////////////////////////////////////////////////////// RENDER
  return (
    <Toolbar
      style={{
        // marginBottom: 30,
        marginTop: -20,
        position: 'sticky',
        top: 0,
        zIndex: 9999999,
        background: '#424242',
        // background: '#616161',
        width: 'calc(100% + 60px)',
        marginLeft: -30
      }}>
      <IconButton onClick={toggleParagraph}>
        <ParagraphIcon 
          style={{ color: type === "unstyled" ? selected : notSelected }}/>
      </IconButton>
      <IconButton onClick={toggleTitle}>
        <TitleIcon 
          style={{ color: type === "header-three" ? selected : notSelected }}/>
      </IconButton>
      <IconButton onClick={toggleCodeBlock}>
        <CodeIcon 
          style={{ color: type === "code-block" ? selected : notSelected }}/>
      </IconButton>
      <IconButton onClick={toggleBlockquote}>
        <BlockquoteIcon 
          style={{ color: type === "blockquote" ? selected : notSelected }}/>
      </IconButton>
      <IconButton onClick={toggleUnorderedListItem}>
        <UnorderedListItemIcon 
          style={{ color: type === "unordered-list-item" ? selected : notSelected }}/>
      </IconButton>
      <CreateLinkButton 
        linkButtonColor={props.currentLinkKey ? selected : notSelected}
        editorState={editorState}
        setEditorState={props.setEditorState}
        onChange={props.onChange}
      />
      <IconButton onClick={openDeleteBlogDialogFn}>
        <DeleteIcon 
          style={{ color: notSelected }}
          />
      </IconButton>
      <DeleteBlogDialog 
        open={openDeleteBlogDialogVar}
        close={closeDeleteBlogDialogFn}
        confirmDeleteBlog={confirmDeleteBlogFn}
      />
    </Toolbar>
  )
}

export default withRouter(TextToolbar)
