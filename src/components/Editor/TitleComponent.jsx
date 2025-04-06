import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/AddAPhoto';
import { Image } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
// import ImageIcon from '@material-ui/core/svg-icons/device/wallpaper';
import { withRouter } from 'react-router-dom';
import moment from 'moment'
import PublishInfo from '../Blog/DisplayBlogItem/PublishInfo'

function TitleComponent(props) {
  ///////////////////////////////////////////////////////////// PROPS VARIABLES
  const { uid, id } = props;
  //////////////////////////////////////////////////////////////// CHANGE ICON
  const [imageURL, setImageURL] = useState(props.imageURL);
  const [currentImageName, setCurrentImageName] = useState(props.currenImageName);
  const onChangeIcon = () => {
    document.getElementById("uploadImage").click();
  }
  useEffect(() => {
    const { id } = props.match.params;
    const { currentImageName } = props;
    const uploadImage = document.getElementById('uploadImage')
    uploadImage.addEventListener('change', event => {
      // If an image already exists
      if (currentImageName) {
        // deleteImageFromFirebase(currentImageName, uid);
        deleteImageNameFromFirebase(id, uid);
      }
      const image = event.target.files[0];
      uploadImageToFirebase(image, uid)
        .then(newImageURL => {
          saveImageToFirebase(newImageURL, id, uid);
          saveImageNameToFirebase(image.name, id, uid);
          setImageURL(newImageURL);
          setCurrentImageName(image.name);
        })
        .catch(err => console.log('err:', err))
    })
  })
  //////////////////////////////////////////////////////////////// CHANGE TITLE
  const [title, setTitle] = useState(props.title);
  const onChangeTitle = event => {
    event.preventDefault();
    const { uid, id } = props;
    console.log("id", id)
    const { value } = event.target;
    setTitle(value)
    firebase
      .database()
      .ref(`/users/${uid}/drafts/${id}/title`)
      .set(value)
  }
  ///////////////////////////////////////////////////////////// CHANGE SUBTITLE
  const [subtitle, setSubtitle] = useState(props.subtitle);
  const onChangeSubtitle = event => {
    event.preventDefault();
    const { value } = event.target;
    setSubtitle(value)
    firebase
      .database()
      .ref(`/users/${uid}/drafts/${id}/subtitle`)
      .set(subtitle)
  }
  return (
    <div>

      <div style={{
        // background: '#fafafa',
        padding: 20,
        display: 'flex',
        // marginBottom: 40,
        flex: 10,
        width: 'calc(100% + 60px)',
        marginLeft: -30,
        paddingBottom: 20,
        paddingTop: 20,
        // marginTop: -40,
        height: 175
      }}>
        {/***************************************************************** ICON */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            // paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
            color: '#455A64',
          }}>
          <span>
            <input
              onChange={onChangeIcon}
              accept="image/*"
              type="file"
              id="uploadImage"
              style={{ display: 'none' }}
            />
            <label htmlFor="uploadImage">
              {imageURL ?
                <Tooltip title="Change Icon">
                  <img
                    // onClick={onChangeIcon}
                    height={90}
                    width={90}
                    style={{ cursor: 'pointer' }}
                    src={imageURL}
                    alt="" />
                </Tooltip>
                :
                <Tooltip title="Upload Icon">
                  <IconButton component="span">
                    <ImageIcon
                      style={{
                        color: "#f48fb1",
                        height: 50,
                        width: 50
                      }} />
                  </IconButton>
                </Tooltip>
              }
            </label>
          </span>
        </div>
        {/****************************************** TITLE AND SUBTITLE */}
        <div style={{
          flex: 12,
          paddingLeft: 20
        }}>
          {/***************************************************** TITLE */}
          {/* <h1> */}
          <input
            value={title}
            onChange={onChangeTitle}
            style={{
              background: 'none',
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
              display: 'block',
              fontSize: '2.5em',
              marginBottom: -10,
              fontFamily: `'Noto Sans', sans-serif`,
            }}
            placeholder="Title"
            type="text"
            className="form-control"
          />

          {/* </h1> */}
          {/************************************************* SUBTITLE */}
          <input
            value={subtitle}
            onChange={onChangeSubtitle}
            style={{
              background: 'none',
              border: 'none',
              boxShadow: 'none',
              outline: 'none',
              display: 'block',
              fontSize: '1.5em',
              fontWeight: 'bolder',
              fontFamily: `'Noto Sans', sans-serif`,
              color: '#696969',
            }}
            placeholder="Subtitle"
            type="text"
            className="form-control" />

          <div style={{
            paddingLeft: 10,
            marginTop: 20
          }}>
            <PublishInfo
              publishedAt={
                props.publishedAt ?
                  props.publishedAt :
                  moment().format('MMM Do YYYY')}
              readTime={props.readTime}
            />
          </div>

        </div>
      </div>
      <hr />
    </div>
  )
}
//////////////////////////////////////////////////////////// FIREBASE FUNCTIONS
const deleteImageFromFirebase = (imageName, uid) => (
  firebase
    .storage()
    .ref(`/users/${uid}/uploadedImages/${imageName}`)
    .delete()
)
const deleteImageNameFromFirebase = (id, uid) => (
  firebase
    .database()
    .ref(`/users/${uid}/drafts/${id}/imageName`)
    .set('')
)
const saveImageToFirebase = (imageURL, id, uid) => (
  firebase
    .database()
    .ref(`/users/${uid}/drafts/${id}/imageURL`)
    .set(imageURL)
)
const saveImageNameToFirebase = (imageName, id, uid) => (
  firebase
    .database()
    .ref(`/users/${uid}/drafts/${id}/imageName`)
    .set(imageName)
)
const uploadImageToFirebase = (image, uid) => (
  firebase
    .storage()
    .ref(`/users/${uid}/uploadedImages/${image.name}`)
    .put(image)
    .then(snap => snap.ref.getDownloadURL())
    .catch(err => console.log('err:', err))
)

export default withRouter(TitleComponent)

