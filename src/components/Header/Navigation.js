import React from 'react'
import { IndexLink, Link } from 'react-router' 
import './Header.scss'

export const ShopNav = ()=>(
  <div className="nav-list">
    <IndexLink to='/shop' activeClassName='active'>
      商家指南
    </IndexLink>
    <Link to='/shop/manage' activeClassName='active'>
      店铺管理
    </Link>
  </div>
);

export const DevNav = ()=>(
  <div className="nav-list">
    <Link to='/developer/apps' activeClassName='active'>
      商家应用
    </Link>
    <Link to='/developer/widgets' activeClassName='active'>
      店铺组件
    </Link>
    <Link to='/developer/api' activeClassName='active'>
      API
    </Link>
    <Link to='/developer/hardware' activeClassName='active'>
      开发硬件
    </Link>
  </div>
);


export const OpenNav = ()=>(
  <div className="nav-list">
    <Link to='/open/apps' activeClassName='active'>
      商家应用
    </Link>
    <Link to='/open/widgets' activeClassName='active'>
      店铺组件
    </Link>
    <Link to='/open/hardware' activeClassName='active'>
      开发硬件
    </Link>
  </div>
);