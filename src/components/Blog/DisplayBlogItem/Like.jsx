import React, { Component } from 'react'
import firebase from 'firebase'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LikeIcon from '@material-ui/icons/FavoriteBorderOutlined'
import LikedIcon from '@material-ui/icons/FavoriteOutlined'
import Tooltip from '@material-ui/core/Tooltip';

// Theme color for badge color
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#696969',
    },
  },
});


class Like extends Component {

  _onClickLikeButton = () => {
    const { blogID, openSignInDialog, uid } = this.props
    // const { uid } = currentUser.userData
    if(uid) {
      if(this.props.likedByCurrentUser) {
        firebase
          .database()
          .ref(`allBlogs/${blogID}/likes/${uid}`)
          .remove()
        
        firebase
          .database()
          .ref(`users/${uid}/likes/${blogID}`)
          .remove()
        
      } else {
        firebase
          .database()
          .ref(`allBlogs/${blogID}/likes/${uid}`)
          .set(true)
        
        firebase
          .database()
          .ref(`users/${uid}/likes/${blogID}`)
          .set(true)
      }
    } else {
      openSignInDialog()
    }
  }

  render() {
    const { blogID, classes } = this.props
    let likeIcon, tooltip;
    if(this.props.likedByCurrentUser) {
      likeIcon = (
        <LikedIcon 
        style={{
         //  color:"#f06292", // dark pink
          color:"#f48fb1", // light pink
        }}
       /> 
      );
      tooltip = "Unlike"
    } else {
      likeIcon = <LikeIcon />
      tooltip = "Like"
    }
    
    return (
      <ThemeProvider theme={theme}>
        <Badge
          color="primary"
          badgeContent={this.props.blogLikes}
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Tooltip title={tooltip}>
            <IconButton
              onClick={this._onClickLikeButton}>
              {likeIcon}
            </IconButton>
          </Tooltip>
        </Badge>
      </ThemeProvider>

    )
  }
}

export default Like