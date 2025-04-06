import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

function Navbar({ currentUser }) {
  const [openDrawer, setOpenDrawer] = useState(false)

  const openDrawerFn = () => {
    setOpenDrawer(true)
  }

  const closeDrawerFn = () => {
    setOpenDrawer(false)
  }

  const _signoutFn = () => {

  }
  return (
    <nav
      className="navbar navbar-expand-md navbar-light "
      style={{
        fontWeight: 'bold',
        background: '#282c33',
        display: 'flex',
        alignItems: 'flex-start'
        // background: '#fff',
      }}>
      <div className="container" style={{ padding: '20px 0 20px' }}>
        {/*===================================================== Saturn Logo */}
        <NavLink
          exact to="/"
          className="navbar-brand"
          activeStyle={{ color: '#ef9a9a' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            // marginTop: 40,
            // fontSize: 21,
            color: '#9e9e9e' //  gray
          }}>
          <div>
            <span style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <img
                style={{
                  height: 50,
                  width: 50,
                  marginRight: 10
                }}
                // src={window.location.origin + '/walnut.png'}
                src={window.location.origin + '/jigsaw2.png'}
                // src={window.location.origin + '/programming.png'}
                alt=""
              />
              <h3
                style={{
                  color: '#fff',
                  fontFamily: `'Noto Sans', sans-serif`
                }}>
                Excerpts
              </h3>

            </span>
            <div>
              {/* <p style={{
                fontWeight: 'normal',
                color: '#fff',
                fontSize: 14
              }}>
                A Computer Science Blog
              </p> */}
            </div>
          </div>

        </NavLink>

        {/*===================================================== Menu Toggle */}
        <IconButton
          onClick={openDrawerFn}
          className="navbar-toggler"
          style={{
            boxShadow: 'none'
          }}>
          <MenuRoundedIcon
            style={{
              fontSize: 36,
              color: location.pathname === '/' ? '#9e9e9e' : '#ef9a9a'
            }} />
        </IconButton>
        {/*========================================================== Links */}
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav justify-content-around">
            {/*==================================================  Dashboard */}
            <li className="nav-item m-2">
              <a
                className="nav-link"
                style={{ color: '#9e9e9e', cursor: 'pointer' }}>
                C++
              </a>
            </li>
            <li className="nav-item m-2">
              <a
                className="nav-link"
                style={{ color: '#9e9e9e', cursor: 'pointer' }}>
                Java
              </a>
            </li>
            {/*=====================================================  About */}
            <li className="nav-item m-2">
              <a
                className="nav-link"
                style={{ color: '#9e9e9e', cursor: 'pointer' }}>
                React
              </a>
            </li>
            {/*==================================================Google Sign In */}
            <li className="nav-item m-2" >
              <a
                className="nav-link"
                style={{ color: '#9e9e9e', cursor: 'pointer' }}>
                JavaScript
              </a>
            </li>
            <li className="nav-item m-2" >
              <a
                className="nav-link"
                style={{ color: '#9e9e9e', cursor: 'pointer' }}>
                LeetCode
              </a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Navbar