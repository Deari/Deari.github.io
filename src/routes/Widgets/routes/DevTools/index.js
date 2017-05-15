import React from 'react'
import DevTools from 'business/DevTools/components/Main'
import { login } from 'utils/login'

const Container = (props) => {
  return <DevTools type={'widgets'} />
}

export default {
  path: 'devtools',
  component: Container,
  onEnter: (nextState, replace, callback) => {
    login(() => {
      callback()
    })
  }
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
