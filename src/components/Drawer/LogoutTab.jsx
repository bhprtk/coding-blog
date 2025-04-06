import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
//////////////////////////////////////////// MATERIAL CORE
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import LogoutIcon from '@material-ui/icons/DirectionsRun'

function LogoutTab(props) {
  const { currentUser, openSignInDialogFunc } = props
  const logout = () => {
    const { closeDrawerFunc, history } = props
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push('/')
        closeDrawerFunc()
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  
  return (
    <div>
      {/* IF USER IS LOGGED IN SHOW LOGOUT TAB */}
      {currentUser ?
        <ListItem 
          button
          onClick={logout}>
          <ListItemIcon>
            <LogoutIcon 
              style={{ 
                height: 30, 
                width: 30,
                color: "#E57373"
              }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
        :
        // IF USER IS NOT LOGGED IN SHOW LOG IN TAB
        <ListItem 
          button
          onClick={openSignInDialogFunc}>
          <ListItemIcon>
            <img 
              src="alien.png" 
              style={{
                height: 25,
                width: 25,
                marginRight: 10
              }}/>
          </ListItemIcon>
          <ListItemText primary="Sign In" />
        </ListItem>
      }
    </div>
  )
}

export default withRouter(LogoutTab)