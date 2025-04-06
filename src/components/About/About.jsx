import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class About extends Component {
  render() {
    return (
      <div
          className="text-center"
          style={{ 
            marginTop: 20,
            fontFamily: `'Noto Sans', sans-serif`,
            color: '#696969'
          }}
        >
          <h4>Information about {`<WordsandCode />`} coming soon!</h4>
        </div>
    )
  }
}

export default About