import React from 'react'
import { injectReducer } from '../../../../store/reducers'

const isMobile = location => location.pathname.indexOf('/m/') !== -1

module.exports = (store) => ({
  path: 'preview',

  getComponent (nextState, cb) {

    require.ensure([], (require) => {

      const { location } = nextState

      const Preview = require('../Editor/containers/PreviewContainer')

      // const product = require('./modules/product').default
      // const preview = require('./modules/preview').default

      // injectReducer(store, { key: 'product', reducer: product })
      // injectReducer(store, { key: 'preview', reducer: preview })
      cb(null, Preview)
    })
  }
})
