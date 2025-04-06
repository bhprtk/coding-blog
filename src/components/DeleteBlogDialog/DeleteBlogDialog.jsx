import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function DeleteBlogDialog(props) {
  const { open, close, confirmDeleteBlog } = props

  return (
    <Dialog
      open={open}
      onClose={close}>
      <DialogTitle>
        <div
          className="row text-center"
          style={{
            justifyContent: 'center',
            marginTop: 20,
            fontFamily: `'Noto Sans', sans-serif`,
            color: '#696969'
          }}>
          {/* IMAGE DIV */}
          <div>
            <img 
              src={window.location.origin + '/alien.png'}
              style={{
                height: 40,
                width: 40,
                marginRight: 10
              }}/>
          </div>
          {/* TITLE SPAN */}
          <span>
            Are you sure you want to delete this blog?
          </span>
        </div>
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={confirmDeleteBlog}
          variant="outlined"
          style={{
            border: '2px solid #E57373',
            textTransform: 'capitalize',
            fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
            color: '#E57373'
          }}>
          Yes, Delete
        </Button>
        <Button
          onClick={close}
          variant="outlined"
          style={{
            border: '2px solid #558B2F',
            textTransform: 'capitalize',
            fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
            color: '#558B2F'
          }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteBlogDialog
