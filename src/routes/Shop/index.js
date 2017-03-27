import React from 'react'
import { IndexLink, Link } from 'react-router'

export default (store) => ({
  path: 'shop',
  getChildRoutes (partialNextState, cb) {
     require.ensure([], (require) => {
       cb(null, [
         //require('./routes/ManageShop')(store),
         require('./routes/ProductCreator')(store),
         //require('./routes/Preview')(store),
       ])
     })
  },
})
