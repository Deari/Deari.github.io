import React from 'react'
import { IndexLink, Link } from 'react-router'
import Doc from './Doc'
import '../../../../styles/_base.scss'
import '../../../../components/Header/Header'

class Container extends React.Component {
  render () {
    return <div className="bg-gray">
    <div className="container">
      <div className="row clx">
        <div className="col-md-10 col-md-offset-2">
          <ul className="nav navbar-nav clx">
            <li>
              <IndexLink to='/developer/hardware' activeClassName='route--active'>
              开发者文档
              </IndexLink>
            </li>
            <li>
              <Link to='/developer/hardware/download' activeClassName='route--active'>
              下载中心
              </Link>
            </li>
            <li>
              <Link to='/developer/hardware/list' activeClassName='route--active'>
              我的硬件
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="container bt20">
      <div className="row">
        {this.props.children}
      </div>
    </div>
    </div>
  }
}

module.exports = store => ({
  path: 'hardware',
  component: Container,
  indexRoute: {
    component: Doc
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Download'),
        require('./List'),
        require('./Create')(store)
      ])
    })
  }
})
