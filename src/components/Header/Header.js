import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Colosseum</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
    {' · '}
    <Link to='/shop' activeClassName='route--active'>
      Shop
    </Link>
    {' · '}
    <Link to='/developer' activeClassName='route--active'>
      Developer
    </Link>
    {' · '}
    <Link to='/1' activeClassName='route--active'>
      Nest Router Demo
    </Link>
  </div>
)

export default Header
