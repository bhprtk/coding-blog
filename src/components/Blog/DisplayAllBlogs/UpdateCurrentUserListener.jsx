import React, { Component } from 'react'
import firebase from 'firebase'

class UpdateCurrentUserListener extends Component {

  componentDidMount() {
    const { currentUser, updateCurrentUser } = this.props
    const { uid } = currentUser.userData
    firebase
      .database()
      .ref(`users/${uid}`)
      .on('value', snap => {
        updateCurrentUser(snap.val())
      })
  }

  render () {
    return <div></div>
  }
}

export default UpdateCurrentUserListener