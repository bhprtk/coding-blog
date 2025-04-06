import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class NoMatchComponent extends Component {

  _goHome = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div
				className="col col-xl-6 offset-xl-3 col-lg-6 offset-lg-3 text-center"
				style={{
					// paddingTop: '10vh'
				}}>
				<img
					width="100%"
          src="https://firebasestorage.googleapis.com/v0/b/wordsandcode-7e6e0.appspot.com/o/assets%2F404.gif?alt=media&token=e1faac74-7982-42f0-8cf4-ce488bb5b156" 
          alt=""
					/>
				<div style={{
						display: 'flex',
						flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
					}}>
					<h4 style={{
            fontFamily: `'Noto Sans', sans-serif`,
          }}>
						whoops! nothing to see here...
					</h4>
					<button
						onClick={this._goHome}
						className="sign-in-button">
						<span className="fa fa-home fa-2x"></span> Home
					</button>

				</div>
			</div>
    )
  }
}

export default withRouter(NoMatchComponent)