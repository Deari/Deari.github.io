import React, { Component } from 'react'
import { Link } from 'react-router'
import SideBar from 'business/SideBar'
import s from './index-new.scss'
import { PageTypes, getPageLinks } from 'config/index'

class DevTools extends Component {
  render() {
    return (
      <div className={`container`} >
        <SideBar pageLinks={getPageLinks('apps')} type={'apps'}></SideBar>
        <div className={s.content}>
          <h1>开发者工具</h1>
          <div>
            <img src="" alt=""/>
            <div>
              <div className="info">
                <h2>开发者文档</h2>
                <p>sdsdsds</p>
              </div>
              <div>
                <Link to="/devtools/account">开发者账户</Link>
                <Link to="/devtools/devinfo">开发密钥</Link>
                <Link to="/devtools/devinfo">开发者文档</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DevTools
