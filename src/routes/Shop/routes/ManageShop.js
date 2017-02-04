import React from 'react'
import { IndexLink, Link } from 'react-router'
import MyShop from './MyShop/'
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
    }
  }
}
