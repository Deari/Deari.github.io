import React from 'react'
import { IndexLink, Link } from 'react-router'

class Container extends React.Component {
  render () {
    return <div>
      <ul>
        <li>
          全部分类
        </li>
        <li>
          分类1
        </li>
        <li>
          分类2
        </li>
      </ul>
      <div> 店铺组件列表</div>
      <ul>
        <li>
          <Link to='/open/widgets/detail/1' activeClassName='route--active'>
          组件1
          </Link>
        </li>
        <li>
          <Link to='/open/widgets/detail/2' activeClassName='route--active'>
          组件2
          </Link>
        </li>
      </ul>
    </div>
  }
}

module.exports =  {
  path: 'widgets',
  indexRoute: {
    component: Container,
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Detail'),
      ])
    })
  }
}
