import React from 'react'
import { IndexLink, Link } from 'react-router'

// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const Business = (props) => (
  <div>
   <h4>我是2层级的商家应用模块</h4>
    <Link to='/developer/applations/doc' activeClassName='route--active'>
      开发者文档
    </Link>
    <Link to='/developer/applations/list' activeClassName='route--active'>
      我的应用
    </Link>
    <div>    
      {props.Documentation}
      {props.myApplation}
    </div>
  </div>
)

export default Business