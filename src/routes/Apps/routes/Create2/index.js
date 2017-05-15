import React from 'react'

module.exports = (store) => ({
  path: 'create2',
  getComponent(partialNextState, cb) {
    const Main = require('./Main').default;
    require.ensure([], (require) => {
      cb(null, Main)
    })
  },
  indexRoute : {
    getComponent(partialNextState, cb) {
      const CreateNav = require('business/CreateNav').default;
      const Main = (props) => <CreateNav type='apps'></CreateNav>
      require.ensure([], (require) => {
        cb(null, Main)
      })
    }
  },

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./containers/H5').default,
        require('./containers/MiniProgram').default,
        require('./containers/Apk').default
      ])
    })
  }

})
