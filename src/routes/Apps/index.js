import React from 'react'
import { IndexLink, Link } from 'react-router'
import Store from './Containers/AppStore'

export default (store) => ({
  path: 'apps',
  indexRoute: {
    component: Store
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Store').default,
        require('./routes/Create')(store),
        require('./routes/Detail')(store),
        require('./routes/List')(store),
        require('./routes/Editor')(store),
        require('./routes/Doc'),
        require('./routes/Analytics/List').default,
        require('./routes/Analytics/OverView').default
      ])
    })
  }
})
