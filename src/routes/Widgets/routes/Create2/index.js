import React from 'react'
import { injectReducer } from 'store/reducers'
import { reducer as formReducer } from 'redux-form'
import BasicContainer from './containers/BasicContainer'
import Complete from './components/Complete'

module.exports = (store) => ({
  path: 'create',
  getComponent(partialNextState, cb) {
    const Main = require('./Main').default;
    
    injectReducer(store, { key: 'form', reducer: formReducer })
  
    require.ensure([], (require) => {
      cb(null, Main)
    })
  },
  indexRoute : {
    getComponent(partialNextState, cb) {
      const CreateNav = require('business/CreateNav').default;
      const Main = (props) => <CreateNav type='widgets'></CreateNav>
      require.ensure([], (require) => {
        cb(null, Main)
      })
    }
  },

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        {
          path: ':type',
          indexRoute: {
            component: BasicContainer
          },
          childRoutes: [
            {
              path: 'complete/:id',
              component: Complete
            }
          ]
        }
      ])
    })
  }

})
