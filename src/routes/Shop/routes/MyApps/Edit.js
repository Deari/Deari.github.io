import React from 'react'
import { IndexLink, Link } from 'react-router'
import { injectReducer } from '../../../../store/reducers'

module.exports = (store) => ({
  path: 'edit',

  getComponent (nextState, cb) {

    require.ensure([], (require) => {
      const Shop = require('./containers/ShopContainer').default
      const product = require('./modules/product').default
      const preview = require('./modules/preview').default

      injectReducer(store, { key: 'product', reducer: product })
      injectReducer(store, { key: 'preview', reducer: preview })
      cb(null, Shop)
    })
  }
})
