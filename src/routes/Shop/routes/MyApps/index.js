import React from 'react'
import { IndexLink, Link } from 'react-router'

class Apps extends React.Component {
  render() {
    return <div>
      <p>这是我的商家应用</p>
      <ul>
        <li><Link to='/shop/manage/apps/1' activeClassName='route--active'>应用1</Link></li>
        <li><Link to='/shop/manage/apps/2' activeClassName='route--active'>应用2</Link></li>
      </ul>
    </div>
  }
}

module.exports = {
  path: 'apps',
  component: Apps,
}