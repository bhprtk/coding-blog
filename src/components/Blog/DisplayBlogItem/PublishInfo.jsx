import React from 'react';
import moment from 'moment';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import EventRoundedIcon from '@material-ui/icons/EventRounded';

function PublishInfo({ publishedAt, readTime }) {
  const date = moment(publishedAt, 'MMM Do YYYY').format('MMM D, YYYY');
  return (
    <div style={{
      display: 'flex',
      // alignItems: 'center',
      color: '#696969',
      fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
      // fontSize: 12,
      // marginBottom: 20
    }}>
      <span>
        <EventRoundedIcon />
        &nbsp;

        {date}
      </span>
      <span style={{
        marginLeft: 20
      }}>
        <AccessTimeRoundedIcon
          // style={{ fontSize: 18 }}
        />
        &nbsp;
        {readTime} min read

      </span>

    </div>
  )
}

export default PublishInfo