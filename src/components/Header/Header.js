import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import Login from '../Login'
import { ShopNav, DevNav, OpenNav } from './Navigation'
import { getApiUrl } from 'utils/domain'
import '../../styles/_base.scss'

const choose = (pathname) => {
  let searchTxt = ''
  const hardwareReg= /\/hardware/
  const widgetReg= /\/widgets/ 
  const appReg= /\/apps/ 
  if(hardwareReg.test(pathname)){
    return searchTxt = '搜索硬件'
  }
  if(widgetReg.test(pathname)){
    return searchTxt = '搜索组件'
  }
  if(appReg.test(pathname)){
    return searchTxt = '搜索应用'
  }
}
const getTpl = ({searchTxt,pathname}) => {
  if (pathname === '/') {
    return <div className="searchBox"></div>
  } else {
    return (
      <div className="search">
        <i className="iconfont icon-search"></i>
        <input type="text" placeholder={searchTxt} />
      </div>
    )
  }
}
export const Header = ({ location, hideHeader }) => {
  if (hideHeader) {
    return null
  }
  const pathname = location.pathname
  const searchTxt = choose(pathname)
  const apiViewUrl = getApiUrl(`#!/`)
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
                <a href={apiViewUrl} activeClassName='active'>
                  API市场
                </a>
                <Link to='/hardware' activeClassName='active'>
                  硬件市场
                </Link>
              </div>
            </div>
            {getTpl({searchTxt,pathname})}
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