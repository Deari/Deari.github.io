import React from 'react'
import { IndexLink, Link } from 'react-router' 
import './Header.scss'
import Login from '../Login'
import {ShopNav, DevNav, OpenNav} from './Navigation'
import '../../styles/_base.scss'

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

export const Header = ({location}) => {
  const path = location.pathname;

  console.log(location);
  
  let nav, title;

  NavRules.map(({pathRe, navC, titleC})=>{
    if(path.search(pathRe) > -1) {
      nav = navC;
      title = titleC;
    }
  })

  return <div className="bg-white border-top-bule">
   <div className="container">
      <div className='g-header'>
        <h1 className="navbar-brand">
          <Link to='/'>
            <i></i><span>BO开放平台</span>
          </Link>
          {title ? <small>{title}</small> : null}
        </h1>
        <div>
          <Login />
          <div className="nav-list">
            <div className="nav navbar-nav navbar-right">
              {nav}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
export default Header
