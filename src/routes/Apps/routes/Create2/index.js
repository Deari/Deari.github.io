import React from 'react'
import { injectReducer } from 'store/reducers'
import { reducer as formReducer } from 'redux-form'
import { login } from 'utils/login'

module.exports = (store) => ({
  path: 'create',
  onEnter: (nextState, replace, callback) => {
    login(() => {
      callback()
    })
  },
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
      const Main = (props) => <CreateNav type='apps'></CreateNav>
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
            component: require('./containers/BasicContainer').default
          },
          childRoutes: [
            {
              path: 'complete/:id',
              component: require('./components/Complete').default
            }
          ]
        }
      ])
    })
  }

})
