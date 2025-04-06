import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import { 
  CompositeDecorator,
  convertFromRaw,
  Editor,
  EditorState,
} from 'draft-js';

import SignInDialog from '../../SignInDialog/SignInDialog'
import Bookmark from './Bookmark'
import Like from './Like'
import Image from './Image'
import PublishInfo from './PublishInfo'
import ReadButton from './ReadButton'
import Subtitle from './Subtitle'
import Title from './Title'

import firebase from 'firebase/app'

function BlogItem(props) {
  const { blog } = props
  // console.log("typeof blog, ", blog)
  // console.log('blog: ', JSON.parse(blog.editorData).blocks)
  const [openSignInDialogVar, setOpenSignInDialogVar] = useState(false);
  const [readTime, setReadTime] = useState()
  const [editorState, setEditorState] = useState(() => 
    EditorState.createWithContent(convertFromRaw(JSON.parse(blog.editorData)))
  )

  const openBlog = () => {
    const { blogID, history } = props
    history.push(`/blog/${blogID}`)
  }

  const openSignInDialogFunc = () => {
    setOpenSignInDialogVar(true);
  }
  const closeSignInDialogFunc = () => {
    setOpenSignInDialogVar(false);
  }

  return (
    <ListItem
      button
      onClick={openBlog}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 20,
        // paddingBottom: 20,
        // maxHeight: 100
        // flex: 10
      }}>
      <img
        height={90}
        width={90}
        src={blog.imageURL}
        alt="" />
      <div
        style={{
          display: 'flex',
          // padding: 20,
          paddingLeft: 20,
          flexDirection: 'column',
          // flex: 9
        }}>
        <Title title={blog.title} />
        <PublishInfo 
          publishedAt={blog.publishedAt} 
          readTime={blog.readTime}
          />
        <Subtitle subtitle={blog.editorData} />
        {/* <Editor 
            
            editorState={editorState}
            readOnly={true}
            
          /> */}
        {/* <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <ReadButton blogID={blogID} />
          <span style={{
            display: 'flex',
            marginTop: 10
          }}>
            <Like
              blogID={blogID}
              uid={uid}
              openSignInDialog={openSignInDialogFunc}
              likedByCurrentUser={props.likedByCurrentUser}
              blogLikes={blog.likes ? Object.keys(blog.likes).length : 0}
            />
            <Bookmark
              blogID={blogID}
              uid={uid}
              openSignInDialog={openSignInDialogFunc}
              bookmarkedByCurrentUser={props.bookmarkedByCurrentUser}
            />
          </span>
        </div> */}
      </div>
      {/* <SignInDialog
        open={openSignInDialogVar}
        close={closeSignInDialogFunc}
      /> */}
    </ListItem>
  )
}

export default withRouter(BlogItem)