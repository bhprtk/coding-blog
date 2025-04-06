import React, { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'

import AboutButton from './AboutButton'
import CollectionButton from './CollectionButton'
import LearnButton from './LearnButton'
import SignInDialog from '../SignInDialog/SignInDialog'
import SwipeableDrawerComponent from '../Drawer/SwipeableDrawerComponent'

function HomePage(props) {
  ///////////////////////////////////////////////////////////// PROPS
  const { currentUser } = props;
  ///////////////////////////////////////////////////////////// STATE
  const [openSignInDialogVar, setOpenSignInDialogVar] = useState(false)
  const [openDrawerVar, setOpenDrawerVar] = useState(false)
  //////////////////////////////////////////////////// SIGN IN / OUT
  const openSignInDialogFunc = () => {
    setOpenSignInDialogVar(true)
  }
  const closeSignInDialog = () => {
    setOpenSignInDialogVar(false)
  }
  //////////////////////////////////////////////////////////// DRAWER
  const openDrawerFunc = () => {
    setOpenDrawerVar(true)
  }
  const closeDrawerFunc = () => {
    setOpenDrawerVar(false)
  }
  //////////////////////////////////////////////////// react-swipeable
  const handlers = useSwipeable({
    onSwipedLeft: () => openDrawerFunc(),
    // onSwipedRight: (eventData) => console.log("User Swiped!", eventData),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div style={{
      height: '100vh',
    }}
    {...handlers}> 

    <div 
      className="text-center"
      style={{
        paddingTop: '20vh'
      }}>
      <div>
        <h3
          style={{
            color: '#696969',
            fontFamily: `'Noto Sans', sans-serif`
          }}>
          Learn Computer Science Basics
        </h3>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          fontFamily: `'Noto Sans', sans-serif`,
          marginTop: 40,
          color: "#696969"
        }}>
      <LearnButton />
      <CollectionButton 
        uid={ currentUser ? currentUser.userData.uid : null }
        openSignInDialog={openSignInDialogFunc}
      />
      <AboutButton />
      
      </div>
      <SwipeableDrawerComponent 
        openVar={openDrawerVar}
        closeFunc={closeDrawerFunc}
        openFunc={openDrawerFunc}
        currentUser={currentUser}
        />
      <SignInDialog 
        close={closeSignInDialog}
        open={openSignInDialogVar}
      />

    </div>
    </div>
  )
}

export default HomePage