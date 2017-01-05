import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import Login from '../Login'
import { ShopNav, DevNav, OpenNav } from './Navigation'
import '../../styles/_base.scss'
import '../../styles/iconfont/iconfont.css'

const choose = (pathname) => {
  let searchTxt = '';
  switch (pathname) {
    case '/hardware':
      searchTxt = '搜索硬件'
      break;
    case '/widgets':
      searchTxt = '搜索组件'
      break;
    default:
      searchTxt = '搜索应用'
  }
  return searchTxt
}
const getTpl = (prop) => {
  return (
    <div className="search">
      <i className="iconfont icon-search"></i>
      <input type="text" placeholder={prop} />
    </div>
  )
}
export const Header = ({ location, hideHeader }) => {
  if (hideHeader) {
    return null
  }
  const searchTxt = choose(location.pathname)
  return (
    <div>
      <div className='header-wrapper'>
        <div className='header-bg'></div>
        <div className='g-header container '>

          <h1 className="title pull-left ">
            <Link to='/' className="logo">
              <i className="icon"></i>
              <span className="text">BO开放平台</span>

            </Link>
            <small className="small-title">开发者平台</small>
          </h1>
          <div className="pull-right">
            <div className="nav">
              <div className="nav-list">
                <Link to='/apps' activeClassName='active'>
                  应用市场
                </Link>
                <Link to='/widgets' activeClassName='active'>
                  组件市场
                </Link>
                <a href='http://apistore.intra.test.ffan.net' activeClassName='active'>
                  API市场
                </a>
                <Link to='/hardware' activeClassName='active'>
                  硬件市场
                </Link>
              </div>
            </div>
            {location.pathname === '/' ? <div className="searchBox"></div>:getTpl(searchTxt)}
            <Login />
          </div>
        </div>
      </div>
      <div style={{height: 77}}></div>
    </div>
  )
}
export default Header
//  <span className="logo-line"></span>  {title ? <small>{title}</small> : null}