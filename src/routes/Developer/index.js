import React from 'react'
import { IndexLink, Link } from 'react-router'
import ApiDoc from './components/ApiDoc'
import '../../styles/_base.scss'

class Nav extends React.Component {
  render() {
    return <div>
    <div className="banner">
      <div className="container"></div>
    </div>
    <div className="container">
      <ul className="home_f">
        <li className="developer_width">
          <Link to='/developer/apps' activeClassName='route--active'>
            <i className="homef-business"></i>
            <h3>商家中心</h3>
            <p>一种新的开放能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
            <span>了解更多</span>
          </Link>
        </li>
        <li className="developer_width">
          <Link to='/developer/widgets' activeClassName='route--active'>
            <i className="homef-business"></i>
            <h3>店铺组件</h3>
            <p>一种新的开放能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
            <span>了解更多</span>
          </Link>
        </li>
        <li className="developer_width">
          <Link to='/developer/api' activeClassName='route--active'>
            <i className="homef-business"></i>
            <h3>API</h3>
            <p>一种新的开放能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
            <span>了解更多</span>
          </Link>
        </li>
        <li className="developer_width">
          <Link to='/developer/hardware' activeClassName='route--active'>
            <i className="homef-business"></i>
            <h3>开放市场</h3>
            <p>一种新的开放能力，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。</p>
            <span>了解更多</span>
          </Link>
        </li>
      </ul>
    </div>
  </div>
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