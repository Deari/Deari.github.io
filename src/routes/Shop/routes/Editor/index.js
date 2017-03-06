import React from 'react'
import { injectReducer } from '../../../../store/reducers'

const isMobile = location => location.pathname.indexOf('/m/') !== -1

module.exports = (store) => ({
  path: 'edit/:pageID',

  getComponent (nextState, cb) {

    require.ensure([], (require) => {

      const { location } = nextState
      const Editor = require('./containers/MobileEditorContainer').default;
      const product = require('./modules/product').default
      const preview = require('./modules/preview').default
      const detail = require('./modules/detail').default

      injectReducer(store, { key: 'product', reducer: product })
      injectReducer(store, { key: 'preview', reducer: preview })
      injectReducer(store, { key: 'detail', reducer: detail })
      cb(null, Editor)
    })
  }
})
