import React from 'react'
import firebase from 'firebase/app'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import PublishedDialog from './PublishedDialog'
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';

function PublishButton(props) {
  const saveDraftFn = () => {
    console.log("save draft fn")
    const { uid, draftID, setSaveDraft } = props
    firebase
      .database()
      .ref(`/users/${uid}/drafts/${draftID}/saved`)
      .set(true)
  }

  const publishBlog = () => {
    const { uid, draftID } = props
    firebase
      .database()
      .ref(`users/${uid}/drafts/${draftID}`)
      .once('value')
      .then(snap => {
        let draft = snap.val();
        if(draft.publishedAt) {
          draft.lastUpdatedAt = moment().format('MMM Do YYYY');
        } else {
          draft.publishedAt = moment().format('MMM Do YYYY');
          draft.author = uid;
        }
        return draft;
      })
      .then(blog => {
        if(blog.lastUpdatedAt) {
          return (
            firebase
              .database()
              .ref(`/allBlogs/${draftID}`)
              .set(blog)
          )
        } else {
          return (
            firebase
              .database()
              .ref('/allBlogs')
              .push(blog)
          ) 
        }
      })
      .then(() => (
        firebase
          .database()
          .ref(`users/${uid}/drafts/${draftID}`)
          .remove()
      ))
      .then(() => {
        // this._openPublishedDialog()
        props.history.push(`/blogs`)
      })
      .catch(error => {
        console.log('error', error)
      })

  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        background: '#fafafa',
        padding: 20,
        marginBottom: 20
    }}>
      <h5 style={{
        color: '#696969',
        fontFamily: `'Noto Sans', sans-serif`,
        paddingTop: 10
      }}>
        Ready to publish?
      </h5>
      <span>
        <Button
          onClick={saveDraftFn}
          variant="outlined"
          size="large"
          startIcon={<SaveIcon />}
          style={{
            border: '2px solid #696969',
            textTransform: 'capitalize',
            fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
            color: '#696969',
            marginRight: 10
          }}>
          Save Draft
        </Button>
        <Button
          onClick={publishBlog}
          variant="outlined"
          size="large"
          startIcon={<PublishIcon />}
          style={{
            border: '2px solid #558B2F',
            textTransform: 'capitalize',
            fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
            color: '#558B2F'
          }}>
          Publish
        </Button>
      </span>
      {/* <button
        onClick={publishBlog}
        className="publish-button float-right"
      >
        <span 
          className="fa fa-upload"
          style={{
            marginRight: 5
          }}
        ></span> Publish
      </button> */}
    </div>
  )
}

export default withRouter(PublishButton)