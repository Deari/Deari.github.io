import React from 'react'
// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'
import { IndexLink, Link } from 'react-router'

export const A = (props) => (
  <div>
    <h4>这是1层级的A模块</h4>
    {props.B||
      <Link to='/1/1-2' activeClassName='route--active'>
      /1/1-2
      </Link>
    }
  </div>
)

export default A