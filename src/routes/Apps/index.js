import React from 'react'
import { IndexLink, Link } from 'react-router'
import Main from './components/Main'

export default (store) => ({
  path: 'apps',
  
  indexRoute: {
    component: Main
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Create')(store),
        require('./routes/Detail')(store),
        require('./routes/List')(store),
        // require('./routes/Editor')(store),
        require('./routes/Doc')
      ])
    })
  }
})
