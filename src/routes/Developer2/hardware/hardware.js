import React from 'react'
import { IndexLink, Link } from 'react-router'

// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const hardware = (props) => (
  <div>
    <h4>这是2层级的hardware模块</h4>
    <Link to='/developer/hardware/doc' activeClassName='route--active'>
      开发者文档
    </Link>
    <Link to='/developer/hardware/list' activeClassName='route--active'>
      我的硬件
    </Link>
    <Link to='/developer/hardware/download' activeClassName='route--active'>
      下载中心
    </Link>
    <div>    
      {props.Documentation}
      {props.myhardware}
      {props.download}
    </div>
  </div>
)

export default hardware