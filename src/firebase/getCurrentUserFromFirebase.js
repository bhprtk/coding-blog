import firebase from 'firebase'
import updateCurrentUser from '../actions/updateCurrentUser'

const getCurrentUserFromFirebase = dispatch => (
  firebase
    .auth()
    .onAuthStateChanged(user => {
      if(user) {
        const { uid, displayName, photoURL, email } = user
        firebase
          .database()
          .ref(`users/${uid}`)
          .once('value')
          .then(snap => {
            const userVal = snap.val()
            if(userVal) {
              dispatch(updateCurrentUser(userVal))
            } else {
              const userData = { uid, email, displayName, photoURL } 
              firebase
                .database()
                .ref(`/users/${userData.uid}/userData`)
                .set(userData)
              dispatch(updateCurrentUser({ userData }))
            }
          })
          .catch(error => {
            console.log('error', error)
          })
      } else {
        dispatch(updateCurrentUser({}))
      }
    })
)

export default getCurrentUserFromFirebase