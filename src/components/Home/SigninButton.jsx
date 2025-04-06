import React, { Component } from 'react'

import IconButton from '@material-ui/core/IconButton'
// import AboutIcon from '@material-ui/core/svg-icons/social/school'
import SigninIcon from '@material-ui/icons/Contacts'

class SigninButton extends Component {
  render() {
    return (
      <span
        style={{
          marginRight: 40
        }}
      >
        <IconButton
          style={{
            height: 80,
            width: 80,
            borderStyle: 'solid',
            borderWidth: 3,
            borderColor: '#696969',
            borderRadius: '50%'
          }}
          // iconStyle={{
          //   height: 40,
          //   width: 40,
          // }}
        >
          <SigninIcon 
            color="#696969" />

        </IconButton>
        <p>Sign In</p>
      </span>
    )
  }
}

export default SigninButton