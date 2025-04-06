import React from 'react'
import { connect } from 'react-redux'

import Main from './Main'

const mapStateToProps = state => ({
  blogs: state.allBlogs,
  currentUser: state.currentUser
})

export default connect(
  mapStateToProps, 
)(Main)