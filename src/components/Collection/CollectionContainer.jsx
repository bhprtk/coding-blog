import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DisplayCollection from './DisplayCollection'

const mapStateToProps = state => ({
  blogs: state.allBlogs,
  currentUser: state.currentUser
})
 
const mapDispatchToProps = dispatch => ({
  // updateCurrentUser: bindActionCreators(updateCurrentUser, dispatch)
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(DisplayCollection)