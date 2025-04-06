import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import updateCurrentUser from '../../../actions/updateCurrentUser'
import DisplayAllBlogs from './x_DisplayAllBlogs'


const mapStateToProps = state => ({
  blogs: state.allBlogs,
  // currentUser: state.currentUser
})
 
const mapDispatchToProps = dispatch => ({
  // updateCurrentUser: bindActionCreators(updateCurrentUser, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayAllBlogs)