import React, { useState, useEffect } from 'react'
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import firebase from 'firebase'
import TestEditor from './TestEditor'

import DisplayAllBlogsContainer from '../Blog/DisplayAllBlogs/DisplayAllBlogsContainer'
import DisplayAllBlogs from '../Blog/DisplayAllBlogs/DisplayAllBlogs'
import About from '../About/About'
import AppBarComponent from '../AppBar/AppBarComponent'
import MyDrafts from '../Drafts/MyDrafts'
import EditorComponent from '../Editor/EditorComponent'
import HomePage from '../Home/HomePage'
import CollectionContainer from '../Collection/CollectionContainer'
import ReadBlog from '../Blog/DisplayBlogItem/ReadBlog'
import NoMatchComponent from '../NoMatch/NoMatchComponent'
import LoadingComponent from '../Loading/LoadingComponent'
import DisplayCollection from '../Collection/DisplayCollection'
import Admin from '../Admin/Admin'
// import PrivateRoute from '../PrivateRoute/PrivateRoute'


function Routes(props) {
  const { currentUser, blogs } = props;
  return (
    <Switch>
      <Route exact path="/">
        <DisplayAllBlogs 
          currentUser={currentUser} 
          blogs={blogs}
          />
        {/* <HomePage currentUser={currentUser} /> */}
      </Route>
      <Route path="/about">
        <About currentUser={currentUser} />
      </Route>
      <Route path="/blogs">
        <DisplayAllBlogs 
          currentUser={currentUser} 
          blogs={blogs}
          />
      </Route>
      <Route path="/blog/:id">
        <ReadBlog currentUser={currentUser} />
      </Route>
      <Route path="/collection">
        {/* <CollectionContainer currentUser={currentUser} /> */}
        <DisplayCollection 
          currentUser={currentUser}
          blogs={blogs}
        />
      </Route>
      <Route path="/no-match">
        <NoMatchComponent currentUser={currentUser} />
      </Route>
      <Route path="/drafts">
        {currentUser && currentUser.userData.isAdmin ?
          <MyDrafts currentUser={currentUser} />
          :
          <NoMatchComponent currentUser={currentUser} />
        }
      </Route>
      <Route path="/admin/:pw">
        {currentUser && currentUser.userData.isAdmin ?
          <Admin currentUser={currentUser} />
          :
          <NoMatchComponent currentUser={currentUser} />
        }
      </Route>
      <Route path="/editor/:id">
        {currentUser && currentUser.userData.isAdmin ?
          <EditorComponent currentUser={currentUser} />
          :
          <NoMatchComponent currentUser={currentUser} />
        }
      </Route>  
      {/* <Route path="/testEditor">
        <TestEditor />
      </Route>        */}
      <Route component={NoMatchComponent} />
    </Switch>
  )
}

export default withRouter(Routes)