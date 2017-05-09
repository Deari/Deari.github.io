import React from 'react'
import { IndexLink, Link } from 'react-router'
// import Store from './Containers/AppStore'

export default (store) => ({
  path: 'apps',
  indexRoute: {
    getComponents(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, {
          children: require('./Containers/AppStore').default
        })
      })
    }
    // component: Store
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Store').default,
        require('./routes/Create')(store),
        require('./routes/Detail')(store),
        require('./routes/List').default,
        require('./routes/Editor')(store),
        require('./routes/Doc').default,
        require('./routes/DevTools').default,
        require('./routes/DevAccount').default,
        require('./routes/Analytics/List').default,
        require('./routes/Analytics/OverView').default
      ])
    })
  }
})
