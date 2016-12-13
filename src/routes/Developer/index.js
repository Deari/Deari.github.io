import React from 'react'
import { IndexLink, Link } from 'react-router'
import ApiDoc from './components/ApiDoc'

class Nav extends React.Component {
  render() {
    return <ul>
      <li>
        <Link to='/developer/apps' activeClassName='route--active'>
          商家应用
        </Link>
      </li>
      <li>
        <Link to='/developer/widgets' activeClassName='route--active'>
        店铺组件
        </Link>
      </li>
      <li>
        <Link to='/developer/api' activeClassName='route--active'>
        API
        </Link>
      </li>
      <li>
        <Link to='/developer/hardware' activeClassName='route--active'>
        开放硬件
        </Link>
      </li>
    </ul>
  }
}

export default (store) => ({
  path: 'developer',
  indexRoute: {
    component: Nav
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Api'),
        require('./routes/Apps'),
        require('./routes/Hardware'),
        require('./routes/Widgets')
      ])
    })
    }
})