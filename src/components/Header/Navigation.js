import React from 'react'
import { IndexLink, Link } from 'react-router' 
import './Header.scss'

export const ShopNav = ()=>(
  <div>
    <IndexLink to='/shop' activeClassName='route--active'>
      商家指南
    </IndexLink>
    <Link to='/shop/manage' activeClassName='route--active'>
      店铺管理
    </Link>
  </div>
);

export const DevNav = ()=>(
  <div>
    <Link to='/developer/apps' activeClassName='route--active'>
      商家应用
    </Link>
    <Link to='/developer/widgets' activeClassName='route--active'>
      店铺组件
    </Link>
    <Link to='/developer/api' activeClassName='route--active'>
      API
    </Link>
    <Link to='/developer/hardware' activeClassName='route--active'>
      开发硬件
    </Link>
  </div>
);


export const OpenNav = ()=>(
  <div>
    <Link to='/open/apps' activeClassName='route--active'>
      商家应用
    </Link>
    <Link to='/open/widgets' activeClassName='route--active'>
      店铺组件
    </Link>
    <Link to='/open/hardware' activeClassName='route--active'>
      开发硬件
    </Link>
  </div>
);