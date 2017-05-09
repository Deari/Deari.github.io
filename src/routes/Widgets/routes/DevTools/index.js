import React from 'react'
import DevTools from 'business/DevTools/components/Main'

const Container = (props) => {
  return <DevTools type={'widgets'}></DevTools>
}

export default {
  path: 'devtools',
  component: Container
  // indexRoute: {
  //   getComponent (nextState, cb) {
  //     require.ensure([], (require) => {
  //       cb(null, require('business/DevTools').default)
  //     })
  //   },
  // },
  // getChildRoutes(partialNextState, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, [
  //       require('./Account').default,
  //       require('./DevInfo').default
  //     ])
  //   })
  // }
}
