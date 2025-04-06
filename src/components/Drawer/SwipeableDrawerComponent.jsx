import React, { useEffect, useState } from 'react';
import firebase from 'firebase'
//////////////////////////////////////////// MATERIAL CORE
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
//////////////////////////////////////////// DRAWER TAB COMPONENTS
import DraftsTab from './DraftsTab'
import LearnTab from './LearnTab';
import CollectionTab from './CollectionTab';
import AboutTab from './AboutTab';
import LogoutTab from './LogoutTab';
import SignInDialog from '../SignInDialog/SignInDialog';

function SwipeableDrawerComponent(props) {
  /////////////////////////////////////////////////////////////// PROPS
  const { currentUser, openVar, closeFunc, openFunc } = props
  /////////////////////////////////////////////////////////////// STATE
  const [openSignInDialogVar, setOpenSignInDialogVar] = useState(false) 
  ///////////////////////////////////////////////// SIGN IN DIALOG FUNCTIONS
  const openSignInDialogFunc = () => {
    setOpenSignInDialogVar(true)
  }
  const closeSignInDialogFunc = () => {
    setOpenSignInDialogVar(false)
  }
  return (
    <SwipeableDrawer  
      anchor="right"
      open={openVar}
      onClose={closeFunc}
      onOpen={openFunc}>
      <div style={{
        width: 350
      }}>
        {/* IF THE USER IS LOGGED IN AND IS THE ADMIN */}
        {currentUser && currentUser.userData.isAdmin ?
          // ADMIN LIST
          <List>
            <ListSubheader>Admin</ListSubheader>
            {/* DRAFT TAB */}
            <DraftsTab 
              closeDrawerFunc={closeFunc}/>
            <Divider />
          </List>
          :
          // IF THE USER IS NOT ADMIN
          <div></div>
        }
        {/* NAVIGATE LIST */}
        <List>
          <ListSubheader>Navigate</ListSubheader>
          {/* LEARN TAB */}
          <LearnTab 
            closeDrawerFunc={closeFunc}/>
          {/* COLLECTION TAB */}
          <CollectionTab 
            closeDrawerFunc={closeFunc}
            currentUser={currentUser}
            openSignInDialogFunc={openSignInDialogFunc}/>
          {/* ABOUT TAB */}
          <AboutTab 
            closeDrawerFunc={closeFunc}/>
        </List>
        <Divider />
        {/* ACCOUNT LIST */}
        <List>
          <ListSubheader>Account</ListSubheader>
          {/* LOGOUT TAB */}
          <LogoutTab 
            currentUser={currentUser}
            closeDrawerFunc={closeFunc}
            openSignInDialogFunc={openSignInDialogFunc}/>
        </List>
      </div>
      {/* SIGN IN DIALOG COMPONENT */}
      <SignInDialog 
        open={openSignInDialogVar}
        close={closeSignInDialogFunc}
      />    
    </SwipeableDrawer>
  )
}

export default SwipeableDrawerComponent