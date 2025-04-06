import React from 'react'
import { withRouter } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views';

//////////////////////////////////// MATERIAL UI
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
//////////////////////////////////// ICONS
import LikeIcon from '@material-ui/icons/FavoriteBorder'
import BookmarkIcon from '@material-ui/icons/BookmarkBorder'
import LikedIcon from '@material-ui/icons/FavoriteOutlined'
import BookmarkedIcon from '@material-ui/icons/Bookmark'
//////////////////////////////////// COMPONENTS
import DisplayLikes from './DisplayLikes'
import DisplayBookmarks from './DisplayBookmarks'
import LoadingComponent from '../Loading/LoadingComponent'
import CollectionsTab from './CollectionsTab';


function DisplayCollection(props) {
  const { blogs, currentUser } = props
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className="col col-xl-6 offset-xl-3 col-lg-6 offset-lg-3">
    
        {/* MAIN DIV WITH COLLECTIONS AND TABS */}
        <div>

          <div 
            style={{ 
              display: 'flex',
              flexDirection: 'row',
              width: 'calc(100% + 60px)',
              marginLeft: -30,
              marginTop: -20,
              height: 130
            }}>
            <CollectionsTab />
            {/* TAB GROUP */}
            <Tabs 
              // className="col-4" 
              value={value} 
              variant="fullWidth"
              onChange={handleChange}
              style={{
                width: '100%',
                // marginLeft: -15
              }}>
              {/* LIKE TAB */}
              <Tooltip title="Likes">
                <Tab 
                  style={styles.buttonStyle}
                  icon={value !== 0 ? 
                  <LikeIcon /> : <LikedIcon style={{ color:"#f48fb1" }}/>
                }/>
              </Tooltip>
              {/* BOOKMARK TAB */}
              <Tooltip title="Bookmarks">
                <Tab 
                  style={styles.buttonStyle}
                  icon={value !== 1 ? <BookmarkIcon /> : <BookmarkedIcon />}
                  />
              </Tooltip>
            </Tabs>
        </div>
        {/* END OF MAIN DIV WITH COLLECTIONS TABS */}
        {!blogs || !currentUser ?
          <LoadingComponent />
          :
        //  {/* TAB PANELS */}
          <SwipeableViews
            enableMouseEvents
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <div hidden={value !== 0}>
              <DisplayLikes 
                blogs={props.blogs}
                currentUser={props.currentUser}
              />
            </div>
            <div hidden={value !== 1}>
              <DisplayBookmarks
                blogs={props.blogs}
                currentUser={props.currentUser}
              />
            </div>
          </SwipeableViews>
        // {/* END OF TAB PANELS */}
      }
      </div>
    </div>
  )
}

const styles = {
  buttonStyle: {
    color: '#696969',
    background: '#fafafa',
    height: 110,
    minWidth: 20,
  }
}

export default withRouter(DisplayCollection)

