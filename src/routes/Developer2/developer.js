import React from 'react'
import { IndexLink, Link } from 'react-router'

export const Developer = (props) => (
  <div>
      <h4>大家好 我是首层Developer模块</h4>
      <Link to='/developer/applations' activeClassName='route--active'>
      商家应用
      </Link>——
      <Link to='/developer/components' activeClassName='route--active'>
      店铺组件
      </Link>——
      <Link to='/developer/api' activeClassName='route--active'>
      API
      </Link>——
      <Link to='/developer/hardware' activeClassName='route--active'>
      开放硬件
      </Link>
      <div>
      {props.Api}
      {props.applation}
      {props.components}
      {props.hardware}
      </div>
  </div>
 
)

export default Developer
