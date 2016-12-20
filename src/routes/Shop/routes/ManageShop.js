import React from 'react'
import { IndexLink, Link } from 'react-router'
import MyShop from './MyShop/'
// import './Shop.scss'
class Shop extends React.Component {
  render() {
    return <div className="bg-gray">
      <div className="container">
        <div className="row">
          {this.props.children}
        </div>
      </div>
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
