import React, { Component } from 'react'
import firebase from 'firebase'

import IconButton from '@material-ui/core/IconButton'

import BookmarkIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkedIcon from '@material-ui/icons/Bookmark'
import Tooltip from '@material-ui/core/Tooltip';

class Bookmark extends Component {

  _onClickBookmark = () => {
    const { blogID, currentUser, openSignInDialog, uid } = this.props
    // const { uid } = currentUser.userData
    if(uid) {
      if(this.props.bookmarkedByCurrentUser) {
        firebase
          .database()
          .ref(`users/${uid}/bookmarks/${blogID}`)
          .remove()
      } else {
        firebase
          .database()
          .ref(`users/${uid}/bookmarks/${blogID}`)
          .set(true)
      }
    } else {
      openSignInDialog()
    }
  }

  render() {
    let bookmarkIcon, tooltip;
    if(this.props.bookmarkedByCurrentUser) {
      bookmarkIcon = <BookmarkedIcon />
      tooltip = "Unsave"
    } else {
      bookmarkIcon = <BookmarkIcon />
      tooltip = "Save"
    }

    return (
      <Tooltip title={tooltip}>
        <IconButton
          onClick={this._onClickBookmark}>
          {bookmarkIcon}
        </IconButton>
      </Tooltip>
    )
  }
}

export default Bookmark