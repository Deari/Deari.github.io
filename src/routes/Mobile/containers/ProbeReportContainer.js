import React from 'react'

import ProbeReport from '../components/Probe/Report'

const promised = {
}

export const Promised = (promiseProp, Wrapped) => class extends React.Component {
  render () {
    return <Wrapped />
  }
}

export default Promised(promised, ProbeReport)
