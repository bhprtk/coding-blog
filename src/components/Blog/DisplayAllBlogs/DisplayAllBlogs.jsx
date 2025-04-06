import React from 'react';
import { withRouter } from 'react-router-dom'
import LoadingComponent from '../../Loading/LoadingComponent'
import BlogItem from '../DisplayBlogItem/BlogItem'
import Button from '@material-ui/core/Button';

function DisplayAllBlogs(props) {
  const { blogs, currentUser, history } = props;
  return (
    <div className="col col-xl-6 offset-xl-3 col-lg-6 offset-lg-3">
      {/* <div
        style={{
          background: '#fafafa',
          padding: 20,
          marginBottom: 20,
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
        <Button
          variant="outlined"
          style={{
            border: '2px solid #558B2F',
            // background: '#558B2F',
            textTransform: 'capitalize',
            fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
            color: '#558B2F',
            // color: '#fff'
          }}>
          Become a member
        </Button>
      </div>
      <h4 style={{
        fontFamily: `'Noto Sans', sans-serif`,
        marginBottom: 20
      }}>EXPLORE CONTENT:</h4> */}
      {!blogs ?
        <LoadingComponent />
        :
        <div>
          {Object.keys(blogs).reverse().map((id, index) => {
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
                      ? true : false}
                />
                <hr />
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

export default withRouter(DisplayAllBlogs);