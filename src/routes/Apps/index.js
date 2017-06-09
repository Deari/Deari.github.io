import React from 'react'
import { IndexLink, Link } from 'react-router'
import { injectReducer } from 'store/reducers'
import appStoreReducer from 'reducers/appStore'

export default (store) => ({
  path: 'apps',
  indexRoute: {
    getComponents (nextState, cb) {
      require.ensure([], (require) => {
        injectReducer(store, { key: 'appStore', reducer: appStoreReducer })
        cb(null, {
          children: require('./Containers/AppStore').default
        })
      })
    }
  },
  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Store')(store),
        // require('./routes/Create')(store),
        require('./routes/Create2')(store),
        // require('./routes/Detail/new').default,
        require('./routes/Detail')(store),
        require('./routes/List').default,
        // require('./routes/Editor')(store),
        require('./routes/Editor2')(store),
        require('./routes/Doc').default,
        require('./routes/DevTools').default,
        require('./routes/DevAccount').default,
        require('./routes/Analytics/List').default,
        require('./routes/Analytics/OverView').default
      ])
    })
  }
})
