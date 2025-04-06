import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BlogIcon from '@material-ui/icons/LibraryBooks'
import Button from '@material-ui/core/Button';

const ReadButton = props => {
  const _openBlog = () => {
    const { blogID, history } = props
    history.push(`/blog/${blogID}`)
  }
  return (
    <Button
      onClick={_openBlog}
      variant="outlined"
      startIcon={<BlogIcon />}
      style={{
        border: '2px solid #558B2F',
        textTransform: 'capitalize',
        fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
        color: '#558B2F'
      }}>
      Read
    </Button>
  )
}

export default withRouter(ReadButton)