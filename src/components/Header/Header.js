import React from 'react'
import { IndexLink, Link } from 'react-router' 
import './Header.scss'


export const Header = () => (
  <div className='header'>
    <h1>
	    <i></i>
	    BO开放平台
	  </h1>
    <div>
	    <IndexLink to='/' activeClassName='route--active' className="nav-select">
	      Home
	    </IndexLink>
	    <Link to='/counter' activeClassName='route--active'>
	      Counter
	    </Link>
	    <Link to='/shop' activeClassName='route--active'>
	      Shop
	    </Link>
	    <Link to='/developer' activeClassName='route--active'>
	      Developer
	    </Link>
    </div>
  </div>
)

export default Header
