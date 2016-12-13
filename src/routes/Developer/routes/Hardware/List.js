import React from 'react'
import { IndexLink, Link } from 'react-router'

class MyHardware extends React.Component {
  render() {
    return <div>
      <p>hello 开发硬件的我的硬件</p>
      <Link to='/developer/hardware/create' activeClassName='route--active'>
        创建硬件
      </Link>
    </div>
  }
}

module.exports = {
  path: 'list',
  component: MyHardware
}
