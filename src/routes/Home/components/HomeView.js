import React from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'
import { IndexLink, Link } from 'react-router'

export const HomeView = () => (
  <div>
    <p>公告区域</p>
    <ul>
      <li>
        <Link to='/shop' activeClassName='route--active'>
          商家中心
        </Link>
      </li>
      <li>
        <Link to='/developer' activeClassName='route--active'>
          开发者中心
        </Link>
      </li>
      <li>
        <Link to='/open' activeClassName='route--active'>
          开放市场
        </Link>
      </li>
    </ul>
  </div>
)

export default HomeView
