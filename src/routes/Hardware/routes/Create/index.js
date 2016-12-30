import React from 'react'
import { injectReducer } from '../../../../store/reducers'
import { reducer as formReducer } from 'redux-form'

module.exports = (store) => ({
  path: 'create',
  
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Create = require('./containers/CreateContainer').default;
      const createReducer = require('./modules/create').default;

      injectReducer(store, { key: 'form', reducer: formReducer })
      injectReducer(store, { key: 'hardwareCreate', reducer: createReducer })

      cb(null, Create)
    })
  }
  
})
