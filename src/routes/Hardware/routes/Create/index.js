import React from 'react'
import { injectReducer } from '../../../../store/reducers'
import { reducer as formReducer } from 'redux-form'

module.exports = (store) => ({
  path: 'create',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Create = require('./containers/CreateContainer').default
      injectReducer(store, { key: 'form', reducer: formReducer })
      cb(null, Create)
    })
  }
})
