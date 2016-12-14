import React from 'react'
import { IndexLink, Link } from 'react-router'

class Detail extends React.Component {
  render() {
    return <div>这是我的商家应用-详情页</div>
  }
}

module.exports = {
  path: 'apps/:aid',
  component: Detail,
}
