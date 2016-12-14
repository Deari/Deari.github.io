import React from 'react'
import { IndexLink, Link } from 'react-router'
import AppsList from '../../components/Apps/List'

class AppList extends React.Component {
  render() {
    return <AppsList />
  }
}

module.exports = {
  path: 'list',
  component: AppList
}
