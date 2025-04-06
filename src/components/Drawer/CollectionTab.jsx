import React from 'react'
import { withRouter } from 'react-router-dom'
//////////////////////////////////////////// MATERIAL CORE
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

function CollectionTab(props) {
  const openCollection = () => {
    const { 
      closeDrawerFunc, 
      currentUser, 
      history, 
      openSignInDialogFunc } = props
    if(currentUser) {
      history.push('/collection')
      closeDrawerFunc();
    } else {
      openSignInDialogFunc();
    }
  }
  return (
    <ListItem 
      button
      onClick={openCollection}>
      <ListItemIcon>
        <img 
          src="collection.png" 
          style={{
            height: 25,
            width: 25,
            marginRight: 10
          }}/>
      </ListItemIcon>
      <ListItemText primary="Collection" />
    </ListItem>
  )
}

export default withRouter(CollectionTab)