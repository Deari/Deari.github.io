import React from 'react'
import  { injectReducer } from '../../store/reducers'
//import  product from './containers/ProductContainer'
//import Shop from './containers/ShopContainer'


export default (store) => ({
  path: 'shop',

  //component: Shop

  getComponent (nextState, cb) {

    require.ensure([], (require) => {
      const Shop = require('./containers/ShopContainer').default
      const product = require('./modules/product').default

      injectReducer(store, { key: 'product', reducer: product })
      cb(null, Shop)
    })
  }
})

