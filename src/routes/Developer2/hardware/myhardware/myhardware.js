import React from 'react'
import { IndexLink, Link } from 'react-router'
// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const myhardware = () => (
  <div>
    <h4>这是3层级的myhardware模块</h4>
    <Link to='/developer/hardware/listtype/:type=1' activeClassName='route--active'>
      开发者文档
    </Link>
    <Link to='/developer/hardware/listtype/:type=2' activeClassName='route--active'>
      我的硬件
    </Link>
  </div>
)

export default myhardware
