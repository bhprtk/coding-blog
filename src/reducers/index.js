import { combineReducers } from 'redux'
import allBlogs from './allBlogsReducer'
import currentUser from './currentUserReducer'

const rootReducer = combineReducers({ 
  allBlogs,
  currentUser
})

export default rootReducer