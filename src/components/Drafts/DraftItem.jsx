import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import BlogIcon from '@material-ui/icons/LibraryBooks'

class DraftItem extends Component {
  
  state = {
		iconColor: '#558B2F'
  }

  _onMouseEnter = () => this.setState({ iconColor: '#fff' })
  _onMouseLeave = () => this.setState({ iconColor: '#558B2F' })

  _openEditor = () => {
    const { history, draft, draftID } = this.props
    // console.log('draft', draft)
    history.push(`/editor/${draftID}`)
  }
  
  render() {
    const { draft } = this.props
    return (
      <div
        style={{
        display: 'flex',
        flexDirection: 'row',
        flex: 10
      }}>
        <div
          style={{
          display: 'flex',
          flex: 1,
          paddingTop: 10,
          justifyContent: 'center',
          color: '#455A64',
        }}>
          <img
            height={50}
            width={50}
            src={draft.imageURL}
            alt=""/>
        </div>
  
        <div
          style={{
            display: 'flex',
            paddingLeft: 10,
            flexDirection: 'column',
            flex: 9
          }}>
          <p style={{
            // color: '#455A64',
            fontSize: '1.5em',
            fontFamily: `'Noto Sans', sans-serif`,
            marginBottom: 0
          }}>
            {draft.title}
          </p>
          <p style={{
            fontSize: '1.2em',
            color: '#696969',
            fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
            lineHeight: 1.5
            }}>
            {draft.subtitle}
          </p>
          <div
            onClick={this._openEditor}
            className="read-button"
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave}
            style={{
              marginTop: 10,
              marginBottom: 10,
              cursor: 'pointer'
            }}>
            <span 
              className="fa fa-edit"
              style={{
                color: this.state.iconColor,
                fontSize: 18,
                marginRight: 5
              }}
            >

            </span>

            <span style={{
              fontFamily: `'Noto Sans', sans-serif`,
              fontWeight: 'normal'
            }}>
              Edit
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(DraftItem)