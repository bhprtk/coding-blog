import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

///////////// @material-ui/core ////////////////////
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
//////////////////////////////////////////////

///////////// @material-ui/core ICONS ////////////////////
import MenuIcon from '@material-ui/icons/Menu';
//////////////////////////////////////////////

import DrawerComponent from '../Drawer/DrawerComponent'

class AppBarComponent extends Component {

  state = {
    openDrawer: false
  }

  _navigate = () => {
    const { history } = this.props
    const { pathname } = history.location
    if(pathname === '/blogs') {
      history.push('/')
    } else {
      history.push('/blogs')
    }
  }

  _openDrawer = () => {
    this.setState({
      openDrawer: true
    })
  }

  _toggleDrawer = () => {
    this.setState({
      openDrawer: !this.state.openDrawer
    })
  }

  render() {
    const brand = (
      <h5 
        onClick={this._navigate}
        style={{
          color: '#696969',
          fontFamily: `'Noto Sans', sans-serif`,
          marginTop: 20,
          whiteSpace: 'nowrap',
          cursor: 'pointer'
        }} >
        {`<WordsAndCode${' '}/>`}
      </h5>
    )

    const menu = (
			<IconButton
				onClick={this._openDrawer}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: 60,
					width: 60
				}}
				// iconStyle={{
				// 	height: 40,
				// 	width: 40
				// }}
        >
				<MenuIcon color="#696969"/>
			</IconButton>
		)

    return (
      <div>
        <AppBar
          iconElementLeft={brand}
          iconElementRight={menu}
          style={{
            background: '#F8F8F8',
            position: 'fixed',
            paddingBottom: 10
          }}
        />
        <DrawerComponent 
          currentUser={this.props.currentUser}
          openDrawer={this.state.openDrawer}
          toggleDrawer={this._toggleDrawer}
        />
      </div>
    )
  }
}

export default withRouter(AppBarComponent)