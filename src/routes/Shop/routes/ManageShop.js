import React from 'react'
import { IndexLink, Link } from 'react-router'
import MyShop from './MyShop/'
// import './Shop.scss'
class Shop extends React.Component {
  render() {
    return <div>
      <div className="editor-left">
        <ul className="sub-nav">
          <li className="sub-nav-active">
            <IndexLink to='/shop/manage' activeClassName='route--active'>
              我的店铺
            </IndexLink>
          </li>

          <li>
            <Link to='/shop/manage/apps' activeClassName='route--active'>
              我的商家应用
            </Link>
          </li>

          <li>
            <Link to='/shop/manage/widgets' activeClassName='route--active'>
              我的店铺组件
            </Link>
          </li>

          <li>
            <Link to='/shop/manage/hardware' activeClassName='route--active'>
              我的硬件
            </Link>
          </li>
        </ul>
      </div>
      <div>{this.props.children}</div>
    </div>
  }
}

module.exports = function (store) {
  return {
    path      : 'manage',
    component : Shop,
    indexRoute: {
      component: MyShop
    },

    getChildRoutes (partialNextState, cb) {
      require.ensure([], (require) => {

        cb(null, [
          require('./MyApps/index').default(store),
          require('./MyHardware/index'),
          require('./MyWidgets/index')
        ])
      })
    },
  }
}
