import React from 'react'
import { IndexLink, Link } from 'react-router'
// import './Header.scss'

export const Header = () => (
  <div>
    <h1>另外一个HEADER</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/1' activeClassName='route--active'>
      Nest Router Demo
    </Link>
  </div>
)

export default Header