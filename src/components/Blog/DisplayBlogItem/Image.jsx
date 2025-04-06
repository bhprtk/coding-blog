import React from 'react'

const Image = ({ imageURL }) => (
  <div
    style={{
      display: 'flex',
      flex: 1,
      paddingTop: 10,
      justifyContent: 'center',
      // marginRight: 20
    }}>
    <img
      height={50}
      width={50}
      src={imageURL}
      alt=""/>
  </div>
)

export default Image