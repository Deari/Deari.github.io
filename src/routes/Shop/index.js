import React from 'react'
import { injectReducer } from '../../store/reducers'
//import  product from './containers/ProductContainer'
//import Shop from './containers/ShopContainer'


export default (store) => ({
  path: 'shop',

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
