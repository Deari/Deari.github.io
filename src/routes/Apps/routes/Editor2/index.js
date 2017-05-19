import React from 'react'
import { injectReducer } from 'store/reducers'
import { reducer as formReducer } from 'redux-form'
import BasicContainer from './containers/BasicContainer'
import VersionContainer from './containers/VersionContainer'

module.exports = (store) => ({
  path: 'edit2/:id',
  getComponent(partialNextState, cb) {
    const Main = require('./Main').default;
    injectReducer(store, { key: 'form', reducer: formReducer })
    require.ensure([], (require) => {
      cb(null, Main)
    })
  },

  indexRoute : {
    getComponent(partialNextState, cb) {
      require.ensure([], (require) => {
        cb(null, BasicContainer)
      })
    }
  },

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        {
          path: 'basic',
          component: BasicContainer
        },
        {
          path: 'version',
          component: VersionContainer
        }
      ])
    })
  }

})
