import React from 'react'
import { IndexLink, Link } from 'react-router'

// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const Components = (props) => (
  <div>
    <h4>我是2层级的components模块</h4>
    <Link to='/developer/components/doc' activeClassName='route--active'>
      开发者文档
    </Link>
    <Link to='/developer/components/list' activeClassName='route--active'>
      我的组件
    </Link>
    <div>    
      {props.Documentation}
      {props.myComponet}
    </div>
  </div>
)

export default Components