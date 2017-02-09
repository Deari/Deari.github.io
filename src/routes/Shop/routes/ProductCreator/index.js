import React from 'react'

module.exports = store => ({
  path: 'product/create',

  getComponent (nextState, cb) {
    require.ensure([], require => {
      const Creator = require('./containers/ProductCreatorContainer').default

      cb(null, Creator)
    })
  }
})
