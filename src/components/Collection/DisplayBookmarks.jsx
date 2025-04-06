import React, { Component } from 'react'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import BlogItem from '../Blog/DisplayBlogItem/BlogItem'
import LoadingComponent from '../Loading/LoadingComponent'

class DisplayBookmarks extends Component {

  render() {
    const { blogs, currentUser } = this.props
    if(!currentUser.bookmarks) {
      return (
        <div
          className="text-center"
          style={{ 
            marginTop: 20,
            fontFamily: `'Noto Sans', sans-serif`,
            color: '#696969'
          }}
        >
          <h4>You have not bookmarked any blogs yet.</h4>
        </div>
      )
    } else {
      return (
        Object.keys(currentUser.bookmarks).map((id, index) => (
          <div key={index} style={{marginTop: 20}}>
            <BlogItem
              blog={blogs[id]} 
              blogID={id} 
              uid={currentUser.userData.uid}
              likedByCurrentUser={ currentUser.likes && id in currentUser.likes ? true : false }
              bookmarkedByCurrentUser={ currentUser.bookmarks && id in currentUser.bookmarks ? true : false }
            />
            <hr/>
          </div>
        ))
      )
    }

  }
}

export default withRouter(DisplayBookmarks)