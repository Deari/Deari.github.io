import React from 'react'
import { IndexLink, Link } from 'react-router'

class Detail extends React.Component {
  render() {
    return <div>hello 开放硬件-商家应用详情页</div>
  }
}

module.exports = {
  path: 'detail/:id',
  component: Detail
}
