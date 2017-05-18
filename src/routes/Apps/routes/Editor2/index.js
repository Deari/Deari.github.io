import React from 'react'
import { injectReducer } from 'store/reducers'
import { reducer as formReducer } from 'redux-form'

module.exports = (store) => ({
  path: 'edit2/:type/:id',
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
        cb(null, require('../Create2/containers/BasicContainer').default)
      })
    }
  },

  // getChildRoutes (partialNextState, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, [
  //       require('./containers/H5').default,
  //       require('./containers/MiniProgram').default,
  //       require('./containers/Apk').default
  //     ])
  //   })
  // }

})
