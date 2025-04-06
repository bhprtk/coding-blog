import React from 'react'
import { withRouter } from 'react-router-dom'
//////////////////////////////////////////// MATERIAL CORE
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
//////////////////////////////////////////// MATERIAL ICONS
import DraftsIcon from '@material-ui/icons/Drafts'

function DraftsTab(props) {
  const openDrafts = () => {
    const { closeDrawerFunc, history } = props
    history.push('/drafts')
    closeDrawerFunc();
  }

  return (
    <ListItem 
      button
      onClick={openDrafts}>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  )
}

export default withRouter(DraftsTab)