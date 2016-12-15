import React from 'react'
import { injectReducer } from '../../../../store/reducers'

module.exports = (store) => ({
  path: 'edit',

  getComponent (nextState, cb) {

    require.ensure([], (require) => {
      const Editor = require('./containers/EditorContainer').default
      const product = require('./modules/product').default
      const preview = require('./modules/preview').default

      injectReducer(store, { key: 'product', reducer: product })
      injectReducer(store, { key: 'preview', reducer: preview })
      cb(null, Editor)
    })
  }
})
