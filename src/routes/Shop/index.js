import React from 'react'

export default (store) => ({
  path: 'shop',


  getComponent (nextState, cb) {

    const Shop = require('./containers/ShopContainer').default


    cb(null, Shop)
  }
})

