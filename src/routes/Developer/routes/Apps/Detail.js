import React from 'react'
import { IndexLink, Link } from 'react-router'
import AppsDetail from '../../components/Apps/Detail'

class Detail extends React.Component {
  render() {
    return <AppsDetail />
  }
}

module.exports = {
  path: ':id/detail',
  component: Detail
}
