import React from 'react'
import { IndexLink, Link } from 'react-router'
// import ApiDoc from './components/ApiDoc'
import '../../styles/_base.scss'
import '../../styles/iconfont/iconfont.css'

class Nav extends React.Component {
  render() {
    return <div>
      <p>开放市场介绍</p>
      <ul>
        <li>
          <Link to='/open/apps' activeClassName='route--active'>
            商家应用
          </Link>
        </li>
        <li>
          <Link to='/open/widgets' activeClassName='route--active'>
          店铺组件
          </Link>
        </li>
        <li>
          <Link to='/open/hardware' activeClassName='route--active'>
          开放硬件
          </Link>
        </li>
      </ul>
    </div>
  }
}

export default (store) => ({
  path: 'open',
  indexRoute: {
    component: Nav
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Apps'),
        require('./routes/Hardware'),
        require('./routes/Widgets')
      ])
    })
  }
})
