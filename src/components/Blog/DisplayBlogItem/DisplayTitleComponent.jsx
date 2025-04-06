import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment';

import ListItem from '@material-ui/core/ListItem';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import EventRoundedIcon from '@material-ui/icons/EventRounded';

import MenuComponent from '../MenuComponent'
import Title from './Title';
import PublishInfo from './PublishInfo';

function DisplayTitleComponent(props) {
  
  useEffect(() => {
    console.log('props: ', props)
  }, [])

  const navigateToDisplayBlogsFn = () => {
    const { history } = props;
    history.push("/blogs")
    // setTimeout(() => {history.push("/blogs")}, 250)
  }
  return (
    <div>
      <div
        // button
        // onClick={navigateToDisplayBlogsFn}
        style={{
          // background: '#fafafa',
          display: 'flex',
          flexDirection: 'row',
          flex: 10,
          width: 'calc(100% + 60px)',
          marginLeft: -30,
          paddingLeft: 20,
          // paddingTop: 40,
          paddingBottom: 20,
          // marginTop: -20,
          // minHeight: 175
        }}>
        {/***************************************************** ICON */}
        <div
          style={{
            display: 'flex',
            // flex: 1,
            paddingTop: 20,
            justifyContent: 'center',
            alignItems: 'flex-start',
            color: '#455A64',
          }}>
          <img
            height={90}
            width={90}
            src={props.imageURL}
            alt="" />
        </div>
        {/****************************************** TITLE AND SUBTITLE */}
        <div
          style={{
            display: 'flex',
            paddingLeft: 20,
            paddingTop: 20,
            flexDirection: 'column',
            // flex: 9
          }}>
          {/***************************************************** TITLE */}
          <Title title={props.title} />
          {/************************************************* SUBTITLE */}
          <h4 style={{
            color: '#696969',
            fontFamily: `'Noto Sans', sans-serif`,
            fontWeight: 'normal',
            lineHeight: 1.5,
            // fontSize: 20,
            color: '#696969',
            marginBottom: 20
          }}>
            {props.subtitle}
          </h4>
          {/************************************************** PUBLISH INFO */}
          <PublishInfo
            publishedAt={props.publishedAt}
            readTime={props.readTime}
          />





        </div>
      </div>



      {props.currentUser && props.currentUser.userData.isAdmin ?
        <div className="text-center">
          <MenuComponent
            blogID={props.blogID}
          />
        </div>
        :
        <div></div>
      }
      <hr />
    </div>
  )
}
export default withRouter(DisplayTitleComponent)