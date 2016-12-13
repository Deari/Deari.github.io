import React from 'react'
import { IndexLink, Link } from 'react-router'

// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const businessGroup = (props) => (
  <div>
    <h4>这是1-2层级的businessGroup模块</h4>
    {props.C ||
      <Link to='/1/1-2/1-2-3' activeClassName='route--active'>
      /1/1-2/1-2-3
      </Link>  
    }
  </div>
)

export default businessGroup