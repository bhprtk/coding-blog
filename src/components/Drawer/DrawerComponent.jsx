import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'

import AppBar from '@material-ui/core/AppBar'
// import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Subheader from '@material-ui/core/ListSubheader'

// import AboutIcon from '@material-ui/core/svg-icons/social/school'
// import CollectionIcon from '@material-ui/core/svg-icons/image/collections-bookmark'
// import LearnIcon from '@material-ui/core/svg-icons/hardware/laptop-mac'
// import SigninIcon from '@material-ui/core/svg-icons/communication/contacts'
import DraftsIcon from '@material-ui/icons/Drafts'
import LogoutIcon from '@material-ui/icons/DirectionsRun'
// import LogoutIcon from '@material-ui/core/svg-icons/social/sentiment-dissatisfied'

import MenuButton from './MenuButton'
import SignInDialog from '../SignInDialog/SignInDialog'

class DrawerComponent extends Component {

  state = {
    openSignInDialog: false
  }

  _openAbout = () => {
    const { history, toggleDrawer } = this.props
    history.push(`/about`)
    toggleDrawer()
  }

  _openBlogs = () => {
    const { history, toggleDrawer } = this.props
    history.push(`/blogs`)
    toggleDrawer()
  }

  _openDrafts = () => {
    const { history, toggleDrawer } = this.props
    history.push(`/drafts`)
    toggleDrawer()
  }

  _openCollection= () => {
    const { history, toggleDrawer, currentUser } = this.props
    history.push(`/collection`)
    toggleDrawer()
  }

  _openProfilePage = () => {
    const { currentUser, history, toggleDrawer } = this.props
    history.push(`/profile/${currentUser.uid}`)
    toggleDrawer()
  }

  _logout = () => {
    const { history, toggleDrawer } = this.props
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push('/')
        toggleDrawer()
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  _openSignInDialog = () => this.setState({ openSignInDialog: true })
  _closeSignInDialog = () => this.setState({ openSignInDialog: false })

  render() {
    const { currentUser, openDrawer, toggleDrawer } = this.props
    
    return (
      <div>
          <Drawer
            docked={false}
            width={350}
            open={openDrawer}
            onRequestChange={toggleDrawer}
            openSecondary={true}>
            <AppBar
              iconElementRight={<MenuButton toggleDrawer={toggleDrawer} />}
              showMenuIconButton={false}
              style={{
                background: '#F8F8F8',
                position: 'fixed',
                paddingBottom: 10
              }}
            />

            <div style={{
              paddingTop: 80
            }}>

            </div>


            { this.props.currentUser && this.props.currentUser.uid === "sPvLcminKiUuOsqI19vMaLIXnOj2" ? 
              <div>
                <List>
                  <Subheader>Admin</Subheader>
                  <ListItem 
                    onClick={this._openDrafts}
                    primaryText="Drafts" 
                    leftIcon={<DraftsIcon />} 
                  />
          
                </List>
                
                <Divider />

              </div>
              :
              <div></div>
            
            }

            <List>
              <Subheader>Navigate</Subheader>
              <ListItem 
                onClick={this._openBlogs}
                primaryText="Learn" 
                leftIcon={ <img 
                  style={{
                    height: 25,
                    width: 25,
                    marginRight: 10
                  }}
                  src="https://firebasestorage.googleapis.com/v0/b/wordsandcode-7e6e0.appspot.com/o/assets%2FreadBlog.svg?alt=media&token=ffb44668-6265-4f19-8510-8c541d03b550" 
                  alt=""
                />} 
              />
              { this.props.currentUser ?
                <ListItem 
                  onClick={this._openCollection}
                  primaryText="Collection" 
                  leftIcon={ <img 
                    style={{
                      height: 25,
                      width: 25,
                      marginRight: 10
                    }}
                    src="https://firebasestorage.googleapis.com/v0/b/wordsandcode-7e6e0.appspot.com/o/assets%2Fcollection.svg?alt=media&token=66079954-f633-4ea0-96f6-681cbfcd4853" 
                    alt=""
                  />} 
                  // leftAvatar={<Avatar 
                  //   size={30}
                  //   src="https://firebasestorage.googleapis.com/v0/b/wordsandcode-7e6e0.appspot.com/o/assets%2Fcollection.svg?alt=media&token=66079954-f633-4ea0-96f6-681cbfcd4853" />}
                />
                :
                <div></div>
              }
              <ListItem 
                onClick={this._openAbout}
                primaryText="About" 
                leftIcon={<img 
                  style={{
                    height: 25,
                    width: 25,
                    marginRight: 10
                  }}
                  src="https://firebasestorage.googleapis.com/v0/b/wordsandcode-7e6e0.appspot.com/o/assets%2Fabout.svg?alt=media&token=e4c1e404-00fe-4b27-a7e2-1a0577f58088" 
                  alt=""
                />} 
              />
            </List>

            <List>
            <Subheader>Account</Subheader>
            { this.props.currentUser ? 
              <ListItem 
                onClick={this._logout}
                primaryText="Logout" 
                leftIcon={<LogoutIcon color="#E57373" style={{ height: 30, width: 30 }} />} 
              />
              :
              <ListItem 
                onClick={this._openSignInDialog}
                primaryText="Sign In" 
                leftIcon={<img 
                  style={{
                    height: 25,
                    width: 25,
                    marginRight: 10
                  }}
                  src="https://firebasestorage.googleapis.com/v0/b/wordsandcode-7e6e0.appspot.com/o/assets%2Falien.png?alt=media&token=fc7d74b9-d497-4b85-8793-4b7068c12658" 
                  alt=""
                />} 
              />
          }
            </List>

        </Drawer>
        <SignInDialog 
          open={this.state.openSignInDialog}
          close={this._closeSignInDialog}
        />
      </div>
    )
  }
}

export default withRouter(DrawerComponent)