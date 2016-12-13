import React from 'react'
import { IndexLink, Link } from 'react-router'

import Doc from './Doc'

class Container extends React.Component {
  render () {
    return <div>
      <ul>
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
      {this.props.children}
    </div>
  }
}

module.exports =  {
  path: 'hardware',
  component: Container,
  indexRoute: {
    component: Doc
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Download'),
        require('./List')
      ])
    })
  }
}
