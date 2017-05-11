import React from 'react'
import Store from './Containers/AppStore'

export default (store) => ({
  path: 'hardware',

  indexRoute: {
    component: Store
  },

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Store').default,
        require('./routes/Detail')(store)
      ])
    })
  }
})
