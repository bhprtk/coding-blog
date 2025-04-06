import React, { useState } from 'react'
import firebase from 'firebase'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

function SignInDialog(props) {
  const { close, open } = props;
  const [provider] = useState(new firebase.auth.GoogleAuthProvider())
  const googleSignIn = () => {
    firebase
			.auth()
      .signInWithRedirect(provider)
      .then(result => console.log('result', result))
  }
  return (
    <Dialog 
      className="text-center"
      onClose={close} 
      open={open}>
      {/* DIALOG TITLE */}
      <DialogTitle>
        <div
          className="row"
          style={{
            justifyContent: 'center',
            marginTop: 20,
            fontFamily: `'Noto Sans', sans-serif`,
            color: '#696969'
          }}>
          {/* IMAGE DIV */}
          <div>
            <img 
              src={window.location.origin + '/alien.png'}
              style={{
                height: 40,
                width: 40,
                marginRight: 10
              }}/>
          </div>
          {/* TITLE SPAN */}
          <span>
            Sign in to add to your collection!
          </span>
        </div>
      </DialogTitle>  
      {/* DIALOG BUTTONS */}
      <DialogContent
        style={{
          marginBottom: 20
        }}>
          <button
            className="google-button"
            onClick={googleSignIn}
          >
            <span 
              className="fa fa-google"
              style={{
                paddingRight: 10,
              }}
            ></span> Google
          </button>
      </DialogContent>
    </Dialog>
  )
}

export default SignInDialog