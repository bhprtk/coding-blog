import React, { useState, useEffect } from 'react'
import { withRouter, useLocation } from 'react-router-dom'
import firebase from 'firebase'
import Routes from './Routes'
import Navbar from '../Navbar/Navbar';
import Navbar_x from '../Navbar/Navbar_x';

function Main() {
  const location = useLocation();
  ///////////////////////////////////////////////////// STATE VARIABLES
  const [allBlogs, setAllBlogs] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [uid, setUid] = useState(null)
  /////////////////////////////////////////// FIREBASE ON AUTH STATE CHANGE
  useEffect(() => {
    /*
      Everytime onAuthStateChange(): 
        - we get the new user data from provider (e.g. google)
        - we update '/users/${user.id}/userData' with the new user data
        - we get the entire '/users/${user.id}' data and set it to currentUser
    */
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => {
        ///////////////////////////////////////////////// GET USER
        if (user) {
          const { uid, displayName, photoURL, email } = user
          setUid(uid)
          //////////////////////////////////////// UPDATE USER DATA
          firebase
            .database()
            .ref(`/users/${user.uid}/userData`)
            .update({ uid, displayName, photoURL, email })
            .catch(error => {
              console.log("Error during updating user:", error)
            })
          //////////////// FIREBASE GET USER DATA ONCE FOR THE FIRST TIME
          firebase
            .database()
            .ref(`/users/${uid}`)
            .once('value')
            .then(snap => {
              setCurrentUser(snap.val())
            });
        } else {
          setUid(null);
          setCurrentUser(null);
        }
      })
    return () => { unsubscribe() }
  }, [location])
  /////////////////////////////////////////// FIREBASE ON USER DATA CHANGE
  useEffect(() => {
    if (uid) {
      const unsubscribe = firebase
        .database()
        .ref(`/users/${uid}`)
        .on('value', snap => {
          if (snap) {
            setCurrentUser(snap.val())
          }
        });
      return () => { unsubscribe() }
    }
  }, [location])
  /////////////////////////////////////////// FIREBASE ON ALL BLOGS CHANGE
  useEffect(() => {
    const unsubscribe = firebase
      .database()
      .ref('/allBlogs')
      .on('value', snap => {
        if (snap) {
          setAllBlogs(snap.val())
        }
      });
    return () => { unsubscribe() }
  }, [location])
  //////////////// FIREBASE GET BLOGS ONCE WHEN LOADING FOR THE FIRST TIME
  useEffect(() => {
    firebase
      .database()
      .ref('/allBlogs')
      .once('value')
      .then(snap => {
        setAllBlogs(snap.val())
      });
  }, [location])
  return (
    <div
      // className="container-fluid"
      style={{
        // paddingTop: 20
      }}>
      <Navbar currentUser={currentUser} />
      <div
      // style={{ marginTop: '15vh' }}
      >
        <div 
          className="container-fluid"
          style={{
            paddingTop: 20
          }}>
          <Routes
            currentUser={currentUser}
            blogs={allBlogs}
          />

        </div>

      </div>
    </div>
  )
}

export default withRouter(Main)