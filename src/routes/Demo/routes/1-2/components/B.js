import React from 'react'
import { IndexLink, Link } from 'react-router'

// import DuckImage from '../assets/Duck.jpg'
// import './HomeView.scss'

export const B = (props) => (
  <div>
    <h4>这是1-2层级的B模块</h4>
    {props.C ||
      <Link to='/1/1-2/1-2-3' activeClassName='route--active'>
      /1/1-2/1-2-3
      </Link>  
    }
  </div>
)

export default B
