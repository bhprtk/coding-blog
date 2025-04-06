import React, { Component } from 'react'
import firebase from 'firebase'

// import DraftsIcon from 'material-ui/svg-icons/content/drafts'

import DraftItem from './DraftItem'

class MyDrafts extends Component {

  state = {
    currentUser: null,
    drafts: null,
    loadingDrafts: true
  }

  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if(user) {
          const { uid, displayName, photoURL, email } = user
          firebase
            .database()
            .ref(`users/${uid}/drafts`)
            .once('value')
            .then(snap => {
              this.setState({
                currentUser: {
                  uid,
                  displayName,
                  photoURL,
                  email,
                },
                drafts: snap.val(),
                loadingDrafts: false
              })
            })
            .catch(error => console.log('error', error))
        }
      })
  }

  _startNewBlog = () => {
    this.setState({ loadingNewBlog: true })
    const { history } = this.props
    const { uid } = this.state.currentUser
    const newEditorData = {
      editorData: '',
      imageName: '',
      imageURL: '',
      subtitle: '',
      title: ''
    }
    firebase
      .database()
      .ref(`users/${uid}/drafts`)
      .push(newEditorData)
      .then(({ key }) => {
        this.setState({ loadingNewBlog: false })
        history.push(`/editor/${key}`)
      })
  }

render() {

    const { drafts } = this.state

    return (
      <div className="col col-xl-6 offset-xl-3 col-lg-6 offset-lg-3">
        <div
          style={{
            background: '#fafafa',
            padding: 20,
            marginBottom: 20
            }}>
          <h4 style={{
            color: '#696969',
            fontFamily: `'Noto Sans', sans-serif`,
            }}>
            <span 
              className="fa fa-edit"
              style={{
              marginRight: 5
              }}></span>  Drafts:
            
            <button 
              className="publish-button float-right"
              onClick={this._startNewBlog}
            >
              New Blog
            </button>
          </h4>
        </div>

        { 
          this.state.loadingDrafts ?
          <div>
            Loading...
          </div>
          :
          <div>
            {
              this.state.drafts ?
              <div>
                { 
                  Object.keys(drafts).map((id, index) => (
                    <div key={index}>
                      <DraftItem draft={drafts[id]} draftID={id} />
                      <hr/>
                    </div>
                  ))
                }
              </div>
              :
              <div></div>
            }
          </div>
        }
      </div>
    )
  }
}

export default MyDrafts