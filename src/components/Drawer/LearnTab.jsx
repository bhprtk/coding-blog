import React from 'react'
import { withRouter } from 'react-router-dom'
//////////////////////////////////////////// MATERIAL CORE
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

function LearnTab(props) {
  const openBlogs = () => {
    const { closeDrawerFunc, history } = props
    history.push('/blogs')
    closeDrawerFunc();
  }
  return (
    <ListItem 
      button
      onClick={openBlogs}>
      <ListItemIcon>
        <img 
          src="programming.png" 
          style={{
            height: 25,
            width: 25,
            marginRight: 10
          }}/>
      </ListItemIcon>
      <ListItemText primary="Learn" />
    </ListItem>
  )
}

export default withRouter(LearnTab)