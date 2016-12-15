import React from 'react'
import { IndexLink, Link } from 'react-router'
import Info from '../../components/Apps/Info'

class Create extends React.Component {
  render() {
    return <Info />
  }
}

module.exports = {
  path: 'create',
  component: Create
}
