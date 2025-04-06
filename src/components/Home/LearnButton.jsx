import React from 'react'
import { withRouter } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'

function LearnButton(props) {
  const _readBlog = () => {
    const { history } = props
    history.push('/blogs')
  }
  
  return (
    <span
      style={{
        marginRight: 40
      }}>
      <IconButton
        onClick={_readBlog}
        style={{
          height: 80,
          width: 80,
          background: '#F5F5F5',
        }}>
        <img 
          style={{
            height: 50,
            width: 50,
          }}
          src="programming.png" 
          alt=""
        />
      </IconButton>
      <p>Learn</p>
    </span>
  )
}

export default withRouter(LearnButton)