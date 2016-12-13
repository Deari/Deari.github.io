import React from 'react'

export default (store) => ({
  path: 'developer',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Api').default,
        require('./applations').default,
        require('./components').default,
        require('./hardware').default
      ])
    })
  },

  getComponent (nextState, cb) {
   cb(null, {
        children: require('./developer').default
    })
  }
})