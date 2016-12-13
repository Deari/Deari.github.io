import React from 'react'
import { IndexLink, Link } from 'react-router'
import Doc from './Doc'

class Container extends React.Component {
  render () {
    return <div>
      <ul>
        <li>
          <IndexLink to='/developer/apps' activeClassName='route--active'>
          开发者文档
          </IndexLink>
        </li>
        <li>
          <Link to='/developer/apps/list' activeClassName='route--active'>
          我的应用
          </Link>
        </li>
      </ul>
      {this.props.children}
    </div>
  }
}

module.exports =  {
  path: 'apps',
  component: Container,
  indexRoute: {
    component: Doc
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./List')
      ])
    })
  }
}
