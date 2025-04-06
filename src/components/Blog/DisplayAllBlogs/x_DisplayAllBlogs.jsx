import React from 'react'
import { withRouter } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

import BlogItem from '../DisplayBlogItem/BlogItem'
import LoadingComponent from '../../Loading/LoadingComponent'
import UpdateCurrentUserListener from './UpdateCurrentUserListener'

function DisplayAllBlogs(props){
  const { 
    blogs, 
    currentUser, 
    history 
  } = props

  const _navigateHome = () => {
    setTimeout(() => {history.push("/")}, 250)
  }
  return (
    <div>
      <div className="col col-xl-6 offset-xl-3 col-lg-6 offset-lg-3">
        <div
          style={{
            background: '#fafafa',
            padding: 20,
            // paddingLeft: 30,
            marginBottom: 20,
            // width: 'calc(100% + 60px)',
            // marginLeft: -30,
            color: '#696969',
            fontFamily: `'Noto Sans', sans-serif`,
          }}>
            <h5 
              style={{
                lineHeight: 1.5,
            }}>
              Welcome to Excerpt.io where you can find excerpts of basic Computer
              Science concepts and learn how to code them on your own.

            </h5>
        </div>
        <hr/>
        {/* <Tooltip title="Go Home" placement="bottom-start">
          <ListItem
            button
            onClick={_navigateHome}
            style={{
              background: '#fafafa',
              padding: 20,
              paddingLeft: 30,
              marginBottom: 20,
              width: 'calc(100% + 60px)',
              marginLeft: -30,
              marginTop: -20,
              height: 120
              }}>
            <img 
              src="programming.png" 
              style={{
                height: 50,
                width: 50,
                marginRight: 20
              }}/>
            <h2 style={{
              color: '#696969',
              fontFamily: `'Noto Sans', sans-serif`,
            }}>
              Read Blogs:
            </h2>
          </ListItem>
        </Tooltip> */}

      </div>
      <h4>Explore Content</h4>
      <div className="col col-xl-6 offset-xl-3 col-lg-6 offset-lg-3">
        { !blogs ? 
          <LoadingComponent />
          :
          <div>
            { Object.keys(blogs).reverse().map((id, index) => {
              return (
                <div key={index}>
                  <BlogItem 
                    blog={blogs[id]} 
                    blogID={id} 
                    uid={currentUser ? currentUser.userData.uid : null}
                    likedByCurrentUser={
                      currentUser && 
                      currentUser.likes && 
                      id in currentUser.likes 
                      ? true : false 
                    }
                    bookmarkedByCurrentUser={
                      currentUser
                      && currentUser.bookmarks 
                      && id in currentUser.bookmarks 
                      ? true : false }
                  />
                  <hr/>
                </div>
              )
            })}
            {/* { Object.keys(currentUser).length ?
              <UpdateCurrentUserListener 
                currentUser={currentUser} 
                updateCurrentUser={updateCurrentUser}
              />
              :
              <div></div>
            } */}
          </div>
        }
      </div>
    </div>
  )
}

export default withRouter(DisplayAllBlogs)