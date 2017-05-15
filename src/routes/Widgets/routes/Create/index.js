import React from 'react'
import { injectReducer } from 'store/reducers'
import { reducer as formReducer } from 'redux-form'
import { login } from 'utils/login'

module.exports = (store) => ({
  path: 'create',
  onEnter: (nextState, replace, callback) => {
    login(() => {
      callback()
    })
  },
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Create = require('./containers/CreateContainer').default
      const createReducer = require('./modules/create').default

      injectReducer(store, { key: 'form', reducer: formReducer })
      injectReducer(store, { key: 'widgetCreate', reducer: createReducer })

      cb(null, Create)
    })
  }

})
