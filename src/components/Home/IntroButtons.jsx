import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'

import IconButton from 'material-ui/IconButton'

import PersonIcon from 'material-ui/svg-icons/social/person'
import CollectionIcon from 'material-ui/svg-icons/image/collections-bookmark'
import CodeIcon from 'material-ui/svg-icons/hardware/laptop-mac'
import AboutIcon from 'material-ui/svg-icons/social/school'
// import AboutIcon from 'material-ui/svg-icons/communication/contacts'

import SignInDialog from './SignInDialog'

class IntroButtons extends Component {

  state = {
    currentUser: null,
    loadingNewBlog: false,
    openSignInDialog: false,
    iconColor: "#696969"
  }

  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if(user) {
          const { uid, displayName, photoURL, email } = user
          const currentUser = {
            uid,
            displayName,
            photoURL,
            email,
          }
          this.setState({ currentUser })
        } else {
          this.setState({ currentUser: null })
        }
      })
      // .then(currentUser => {
      //   console.log('currentUser', currentUser)
      // })
  }

  //////////////////// ICON COLOR HANDLER /////////////////////////////
  _onMouseEnterCollectionButton = () => this.setState({ iconColor: '#fff' })
  _onMouseLeaveCollectionButton = () => this.setState({ iconColor: '#696969' })

  /////////////////////////////////////////////////////////////////////

  readBlog = () => {
    const { history } = this.props
    history.push('/blogs')
  }
  
  _startNewBlog = () => {
    this.setState({ loadingNewBlog: true })
    const { history } = this.props
    const { uid } = this.state.currentUser
    const newEditorData = {
      editorData: '',
      imageName: '',
      imageURL: '',
      subtitle: '',
      title: ''
    }
    firebase
      .database()
      .ref(`users/${uid}/drafts`)
      .push(newEditorData)
      .then(({ key }) => {
        this.setState({ loadingNewBlog: false })
        history.push(`/editor/${key}`)
      })
  }
  
  _openProfile = () => {
    const { history } = this.props
    const { uid } = this.state.currentUser
    history.push(`/profile/${uid}`)
  }

  ////////////////// SIGN IN  //////////////////////////////////


  _googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(result => {
				const { uid, email, displayName, photoURL } = result.user
        const currentUser = { uid, email, displayName, photoURL }
        this.setState({ currentUser })
        this._closeSignInDialog()
        return currentUser
      })
      .then(currentUser => {
        firebase
          .database()
          .ref(`/users/${currentUser.uid}/userData`)
          .set(currentUser)
      })
			.catch(error => {
				console.log ('error:', error)
			})
  }

  ///////////////////////////////////////////////////////////////

  render() {
    return (
      <div 
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          fontFamily: `'Noto Sans', sans-serif`,
          marginTop: 40,
          color: "#696969"
        }}
      >
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
              borderRadius: '50%',
            }}
            // iconStyle={{
            //   height: 40,
            //   width: 40,
            // }}
          >
            <CodeIcon 
              color="#696969" />

          </IconButton>
          <p>Learn</p>
        </span>
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
            <CollectionIcon 
              color="#696969" />

          </IconButton>
          <p>Collection</p>
        </span>
        
      </div>
    )
    // return (
    //   <div
    //     style={{
    //       marginTop: 40
    //     }}
    //   >
    //     <button
    //       className="read-blog-button"
    //       onClick={this.readBlog}
    //     >
    //       READ BLOG
    //     </button>
    //     {
    //       this.state.currentUser ?
    //       <span>
    //       {
    //         this.state.loadingNewBlog ?
    //         <button
    //           disabled
    //           style={{
    //             background: '#fff',
    //             borderWidth: 2,
    //             borderColor: '#9E9E9E',
    //             height: 40,
    //             marginLeft: 10,
    //             width: 150
    //           }}
    //         >
    //           Loading
    //         </button>
    //         :
    //         <button
    //           className="sign-in-button"
    //           onMouseEnter={this._onMouseEnterCollectionButton}
    //           onMouseLeave={this._onMouseLeaveCollectionButton}
    //           onClick={this._openProfile}
    //         >    
    //           <CollectionIcon 
    //             style={{
    //               height: 20,
    //               width: 20,
    //             }}
    //             color={this.state.iconColor} /> Collection
    //         </button>
    //       }
    //       </span>
    //       :
    //       <button
    //         className="sign-in-button"
    //         onClick={this.openSignInDialog}
    //       >
    //         SIGN IN
    //       </button>
    //     }
    //     <SignInDialog 
    //       close={this._closeSignInDialog}
    //       open={this.state.openSignInDialog}
    //       googleSignIn={this._googleSignIn}
    //     />
    //   </div>
    // )
  }
}

export default withRouter(IntroButtons)