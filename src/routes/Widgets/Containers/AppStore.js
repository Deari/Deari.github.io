import React from 'react'
import AppStore from 'business/AppStore/Container'

export default class Main extends React.Component {
  render () {
    const tag = this.props.params.id || 'all'
    return <AppStore type='widgets' tag={tag} />
  }
}
