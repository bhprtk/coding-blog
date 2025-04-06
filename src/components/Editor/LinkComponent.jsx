import React from 'react'

const LinkComponent = props => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} className="link">
      {props.children}
    </a>
  )
}

export default LinkComponent
