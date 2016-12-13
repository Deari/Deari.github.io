import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import { IndexLink, Link } from 'react-router'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <Link to='/shop' activeClassName='route--active'>
      商家中心
      </Link>
      <Link to='/developer' activeClassName='route--active'>
      开发者中心
      </Link>
      <Link to='/open' activeClassName='route--active'>
      开放市场
      </Link>
  </div>
)

export default HomeView
