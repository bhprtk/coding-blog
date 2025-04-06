import React from 'react'
import { withRouter } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'

function CollectionButton(props) {
  const _openCollection = () => {
    const { history, uid, openSignInDialog } = props
    if(uid) {
      history.push(`/collection`)
    } else {
      openSignInDialog()
    }
  }
  return (
    <span
      style={{
        marginRight: 40
      }}>
      <IconButton
        onClick={_openCollection}
        style={{
          height: 80,
          width: 80,
          background: '#F5F5F5'
        }}>
        <img 
          src="collection.png" 
          style={{
            height: 50,
            width: 50,
          }}/>
      </IconButton>
      <p>Collection</p>
    </span>
  )
}
export default withRouter(CollectionButton)