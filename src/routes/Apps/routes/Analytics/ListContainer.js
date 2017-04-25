import React, { Component } from 'react'
import List from 'business/Analytics/List'

const AnalyticHOC = (Wrapped) => class ListContainer  extends Component {

  render() {
    return <Wrapped {...this.props} pageTitle={'应用'}></Wrapped>
  }
}

export default AnalyticHOC(List)