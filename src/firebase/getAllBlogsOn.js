import firebase from 'firebase'
import {newAllBlogs} from '../actions/creators'

const getAllBlogsOn = dispatch => (
  firebase
    .database()
    .ref(`/allBlogs`)
    .on('value', snap => {
      dispatch(newAllBlogs(snap.val()))
    })
)

export default getAllBlogsOn