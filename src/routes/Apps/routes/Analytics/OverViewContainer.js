import React from 'react'
import OverView from 'business/Analytics/OverView'

const High = (Wrapped) => class OverViewContainer  extends React.Component {
  
  render() {
    const { params } = this.props
    return <Wrapped id={params.id}></Wrapped>
  }
}


export default High(OverView)