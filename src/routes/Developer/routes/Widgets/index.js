import React from 'react'
import { IndexLink, Link } from 'react-router'
import Doc from '../../components/WidgetDevDoc'
import AppList from './List'

class Container extends React.Component {
  render () {
    return <div>
      <ul>
        <li>
          <IndexLink to='/developer/widgets' activeClassName='route--active'>
          开发者文档
          </IndexLink>
        </li>
        <li>
          <Link to='/developer/widgets/list' activeClassName='route--active'>
          我的组件
          </Link>
        </li>
      </ul>
      {this.props.children}
    </div>
  }
}

module.exports =  {
  path: 'widgets',
  component: Container,
  indexRoute: {
    component: Doc
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        {
          path: 'list',
          component: AppList
        }
      ])
    })
  }
}
