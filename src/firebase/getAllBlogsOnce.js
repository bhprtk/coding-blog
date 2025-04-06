import firebase from 'firebase'
import {newAllBlogs} from '../actions/creators'
const getAllBlogsOnce = dispatch => {
  firebase
    .database()
    .ref(`/allBlogs`)
    .once('value')
    .then(snap => {
      dispatch(newAllBlogs(snap.val()))
    })
    .catch(error => {
      console.log('error', error)
    })
} 

export default getAllBlogsOnce