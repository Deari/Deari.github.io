import React from 'react'
import AppsDetail from '../../components/Apps/Detail'

class Detail extends React.Component {
  render() {
    return <AppsDetail />
  }
}

module.exports = {
  path: 'detail/:id',
  component: Detail
}
