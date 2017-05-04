import React from 'react'
import AppStore from 'business/AppStore/Container'

export default class Main extends React.Component {
  render () {
    const tag = this.props.params.id || '0';
    return <AppStore type='hardware' tag={tag}></AppStore>
  }
}
