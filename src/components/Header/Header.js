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
    <Link to='/shop' activeClassName='route--active'>
      Shop
    </Link>
    {' · '}
    <Link to='/developer' activeClassName='route--active'>
      Developer
    </Link>
    {' · '}
    <Link to='/open' activeClassName='route--active'>
      Open
    </Link>
  </div>
)

export default Header
