import React from 'react'
import { IndexLink, Link } from 'react-router'

class AppList extends React.Component {
  render() {
    return <div>hello 我的应用</div>
  }
}

module.exports = {
  path: 'list',
  component: AppList
}
