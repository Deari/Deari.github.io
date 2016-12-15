import React from 'react'
import { IndexLink, Link } from 'react-router'

class MyWidgets extends React.Component {
  render() {
    return <div>这是我的店铺组件</div>
  }
}

module.exports = {
  path: 'widgets',
  component: MyWidgets
}