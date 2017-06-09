import React from 'react'
import { injectReducer } from 'store/reducers'
import { reducer as formReducer } from 'redux-form'
import { login } from 'utils/login'

module.exports = (store) => ({
  path: 'edit/:id',
  onEnter: (nextState, replace, callback) => {
    login(() => {
      callback()
    })
  },

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
        cb(null, require('./containers/BasicContainer').default)
      })
    }
  },

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        {
          path: 'basic',
          component: require('./containers/BasicContainer').default
        },
        {
          path: 'version',
          component: require('./containers/VersionContainer').default
        },
        {
          path: 'complete',
          component: require('./components/Complete').default
        }
      ])
    })
  }

})
