import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'
import Login from '../Login'
import {ShopNav, DevNav, OpenNav} from './Navigation'
import '../../styles/_base.scss'
import '../../styles/iconfont/iconfont.css'

const NavRules = [
  {
    title: '商家中心',
    pathRe: new RegExp('^\\/shop\\/?'),
    navC: <ShopNav />,
    titleC: <Link to='/shop'>商家中心</Link>
  },
  {
    title: '开放市场',
    pathRe: new RegExp('^\\/open\\/?'),
    navC: <OpenNav />,
    titleC: <Link to='/open'>开放市场</Link>
  },
  {
    title: '开发者中心',
    pathRe: new RegExp('^\\/developer\\/\\w+\\/?'),
    navC: <DevNav/>,
    titleC: <Link to='/developer'>开发者中心</Link>
  },
  {
    title: '开发者中心',
    pathRe: new RegExp('^\\/developer\\/?$'),
    titleC: <Link to='/developer'>开发者中心</Link>
  }
];

export const Header = ({location, hideHeader}) => {

  if (hideHeader) return <div></div>
  const path = location.pathname;
  let nav, title;

  NavRules.map(({pathRe, navC, titleC})=>{
    if(path.search(pathRe) > -1) {
      nav = navC;
      title = titleC;
    }
  })

  return (
    <div className='header-wrapper'>
      <div className='header-bg'></div>
      <div className='g-header container '>
        
        <h1 className="title pull-left ">
          <Link to='/' className="logo">
            <i className="icon"></i>
            <span className="text">BO开放平台</span>

          </Link>
          {title ? <small className="small-title">{title}</small> : null}
        </h1>
        
        <div className="pull-right">
          <div className="nav item">
            { nav }
          </div>

          { title ? <div className="search">
              <i className="iconfont icon-search"></i>
              <input type="text" placeholder="搜索API" />
            </div>
            : null
          }
          <Login />
        </div>
      </div>
    </div>
  )
}
export default Header
 //  <span className="logo-line"></span>  {title ? <small>{title}</small> : null}