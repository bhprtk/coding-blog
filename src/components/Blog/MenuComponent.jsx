import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app'
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton'
import DeleteBlogDialog from '../DeleteBlogDialog/DeleteBlogDialog'

function MenuComponent(props) {
  /////////////////////////////////////////////////////////////// EDIT FUNCTION
  const editBlog = () => {
    const { blogID, history} = props
    history.push(`/editor/${blogID}`)
  }
  //////////////////////////////////////////////////////////// DELETE FUNCTIONS
  const [openDeleteBlogDialogVar, setOpenDeleteBlogDialogVar] = useState(false);
  const openDeleteBlogDialogFunc = () => {
    setOpenDeleteBlogDialogVar(true);
  }
  const closeDeleteBlogDialogFunc = () => {
    setOpenDeleteBlogDialogVar(false);
  }
  const confirmDeleteBlogFunc = () => {
    const { blogID, history } = props
    firebase
      .database()
      .ref(`allBlogs/${blogID}`)
      .remove()
    history.push(`/blogs`)
  }
  ////////////////////////////////////////////////////////////// MENU FUNCTIONS
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <span>
        <IconButton
          onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
      </span>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <MenuList
          style={{
            outline: 'none'
          }}>
          <MenuItem onClick={editBlog}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <Typography variant="inherit">Edit</Typography>
          </MenuItem>
          <MenuItem onClick={openDeleteBlogDialogFunc}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <Typography variant="inherit">Delete</Typography>
          </MenuItem>
        </MenuList> 
      </Menu>

      <DeleteBlogDialog 
        open={openDeleteBlogDialogVar}
        close={closeDeleteBlogDialogFunc}
        confirmDeleteBlog={confirmDeleteBlogFunc}
      />
    </div>
  )
}

export default withRouter(MenuComponent)