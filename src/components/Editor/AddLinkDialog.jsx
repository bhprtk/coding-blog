import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  notchedOutline: {
    borderColor: '#696969 !important',
    borderWidth: 2
  }
})

function AddLinkDialog(props) {
  const { classes } = props; 
  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={props.close}>
      <DialogTitle>
        <div
          className="row text-center"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            fontFamily: `'Noto Sans', sans-serif`,
            color: '#696969'
          }}>
          {/* IMAGE DIV */}
          <span>
            <img 
              src={window.location.origin + '/alien.png'}
              style={{
                height: 40,
                width: 40,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 10
              }}/>
          </span>
          {/* TITLE SPAN */}
          <TextField 
            value={props.currentLinkValue}
            onChange={props.onChangeLinkValue}
            fullWidth
            InputProps={{
              classes: { notchedOutline: classes.notchedOutline, /* BORDER STYLE */ },
              style: { color: '#696969', /* FONT COLOR */ }
            }}
            InputLabelProps={{
              style: { color: '#696969', /* FLOATING LABEL COLOR */ }
            }}
            style={{
              maxWidth: '90%',
            }}
            label="Add Link" 
            variant="outlined"
            />
        </div>
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={props.submitLink}
          variant="outlined"
          style={{
            border: '2px solid #558B2F',
            textTransform: 'capitalize',
            fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
            color: '#558B2F',
            // color: '#E57373'
          }}>
          Add Link
        </Button>
        <Button
          onClick={props.close}
          variant="outlined"
          style={{
            border: '2px solid #E57373',
            textTransform: 'capitalize',
            fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
            color: '#E57373',
            // color: '#558B2F',
          }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(AddLinkDialog)
