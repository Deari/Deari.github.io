import React from 'react'
import Info from '../../components/Apps/Info'

class Edit extends React.Component {
  render() {
    return <Info />
  }
}

module.exports = {
  path: 'edit/:id',
  component: Edit
}
