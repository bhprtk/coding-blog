import React from 'react'
import { withRouter } from 'react-router-dom'
//////////////////////////////////////////// MATERIAL CORE
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

function AboutTab(props) {
  const openAbout = () => {
    const { closeDrawerFunc, history } = props
    history.push('/about')
    closeDrawerFunc();
  }
  return (
    <ListItem 
      button
      onClick={openAbout}>
      <ListItemIcon>
        <img 
          src="about.png" 
          style={{
            height: 25,
            width: 25,
            marginRight: 10
          }}/>
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItem>
  )
}

export default withRouter(AboutTab)