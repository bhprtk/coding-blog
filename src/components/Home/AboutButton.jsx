import React from 'react'
import { withRouter } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'

function AboutButton(props) {
  const _openAbout = () => {
    props.history.push('/about')
  }
  return (
    <span>
      <IconButton
        onClick={_openAbout}
        style={{
          height: 80,
          width: 80,
          background: '#F5F5F5'
        }}>
        <img 
          src="about.png" 
          style={{
            height: 50,
            width: 50,
          }}/>
      </IconButton>
      <p>About</p>
    </span>
  )
}
export default withRouter(AboutButton)