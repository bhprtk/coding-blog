import React from 'react'
import ExitIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton'

const MenuButton = ({ toggleDrawer }) => (
  <IconButton
    className="navbar-menu"
    onClick={toggleDrawer}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
      width: 60
    }}
    >
    <ExitIcon color="#696969"/>
  </IconButton>
)

export default MenuButton