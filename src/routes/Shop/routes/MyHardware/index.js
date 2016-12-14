import React from 'react'
import { IndexLink, Link } from 'react-router'

class MyHardware extends React.Component {
  render() {
    return <div>这是我的硬件</div>
  }
}

module.exports = {
  path: 'hardware',
  component: MyHardware
}