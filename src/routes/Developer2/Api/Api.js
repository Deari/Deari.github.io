import React from 'react'
import { IndexLink, Link } from 'react-router'

export const Api = (props) => (
  <div>
    <h4>我是2层级的API模块</h4>
    <Link to='/developer/api/doc' activeClassName='route--active'>
      开发者文档
    </Link>
    <Link to='/developer/api/list' activeClassName='route--active'>
      我的API
    </Link>
    <div>
      {props.Documentation}
      {props.MYApi}
    </div>
  </div>
)

export default Api
