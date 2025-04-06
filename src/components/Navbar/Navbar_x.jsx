import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import SignInDialog from '../SignInDialog/SignInDialog';

function Navbar(props) {
  const [openSignInVar, setOpenSignInVar] = useState(false);

  const navigateHome = () => {
    const { history } = props;
    history.push("/");
  }
  const signIn = () => {
    setOpenSignInVar(true);
  }
  const closeSignInFn = () => {
    setOpenSignInVar(false);
  }
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .catch(error => {
        console.log('error', error)
      })
  }
  return (
    <div className="col-xl-8 offset-xl-2 col-lg-8 offset-lg-2">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
          fontFamily: `'Noto Sans', sans-serif`,
          height: 100,
          color: "#696969",
        }}>
          <Button
            onClick={navigateHome}
            style={{
              textTransform: 'none',
              padding: 20
            }}>
            <img 
              style={{
                height: 50,
                width: 50,
                marginRight: 10
              }}
              src={window.location.origin + '/programming.png'}
              alt=""
            />
            <h3
              style={{
                color: '#696969',
                fontFamily: `'Noto Sans', sans-serif`
              }}>
              Excerpt.io
            </h3>

          </Button>
          {props.currentUser ?
            <Button
             onClick={logout}>
              Sign Out
            </Button>
            :
            <Button
             onClick={signIn}>
              Sign In
            </Button>
          }
        
      </div>
      <SignInDialog 
        open={openSignInVar}
        close={closeSignInFn}
      />
      <hr/>
    </div>
  )
}

export default withRouter(Navbar);