import React from 'react'
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
