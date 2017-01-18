import React from 'react'
import { injectReducer } from 'store/reducers'
import { reducer as formReducer } from 'redux-form'

module.exports = (store) => ({
  path: 'edit/:id',
  
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Edit = require('./containers/EditContainer').default
      const editReducer = require('./modules/edit').default

      injectReducer(store, { key: 'form', reducer: formReducer })
      injectReducer(store, { key: 'hdEdit', reducer: editReducer })

      cb(null, Edit)
    })
  }
  
})
