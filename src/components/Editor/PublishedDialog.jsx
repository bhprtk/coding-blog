import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'

const PublishedDialog = ({ close, open }) => {
  return (
    <Dialog
      className="text-center"
      title="Yay!!!"
      onRequestClose={close}
      open={open}
    >
      You just published your blog. Check it out here
    </Dialog>
  )
}

export default PublishedDialog