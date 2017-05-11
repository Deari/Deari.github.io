import React from 'react'
import { injectReducer } from 'store/reducers'
import { reducer as formReducer } from 'redux-form'
import { login } from 'utils/login'

module.exports = (store) => ({
  path: 'edit/:appId/:step',
  onEnter: (nextState, replace, callback) => {
    login(()=>{
      callback()
    })
  },
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Create = require('./containers/EditContainer').default;
      const editReducer = require('./modules/edit').default;

      injectReducer(store, { key: 'form', reducer: formReducer })
      injectReducer(store, { key: 'widgetEdit', reducer: editReducer })

      cb(null, Create)
    })
  }
  
})
