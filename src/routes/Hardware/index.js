import React from 'react'
import { injectReducer } from 'store/reducers'
import appStoreReducer from 'reducers/appStore'

export default (store) => ({
  path: 'hardware',

  indexRoute: {
    getComponents (nextState, cb) {
      require.ensure([], (require) => {
        injectReducer(store, { key: 'appStore', reducer: appStoreReducer })
        cb(null, {
          children: require('./Containers/AppStore').default
        })
      })
    }
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
