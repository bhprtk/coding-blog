import React from 'react'

const Subtitle = ({ subtitle }) => {
  let text = JSON.parse(subtitle).blocks[1].text
  if(text.length > 250) {
    text = text.substr(0, 250)
  } 
  return (
    <p style={{
      marginTop: 20,
      fontSize: 16,
      color: '#696969',
      fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
      lineHeight: 1.5
      }}>
      {/* {subtitle} */}
      {text} ...
      {/* JavaScript arrays are comparatively more versatile than arrays in other programming languages. That is because first of all, we do not have to worry about allocating memory in JavaScript because the arrays already support dynamic memory. Second, JavaScript arrays ... */}
  
    </p>
  
  )
} 

export default Subtitle