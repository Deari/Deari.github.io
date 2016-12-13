import React from 'react'
import { IndexLink, Link } from 'react-router'

class MyHardware extends React.Component {
  render() {
    return <div>hello 开发硬件的我的硬件</div>
  }
}

module.exports = {
  path: 'list',
  component: MyHardware
}
