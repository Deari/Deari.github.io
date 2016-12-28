import React from 'react'
import Main from './components/Main'

export default (store) => ({
  path: 'widgets',
  
  indexRoute: {
    component: Main
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        //require('./routes/Create')(store),
        // require('./routes/Detail')(store),
         require('./routes/List')(store),
        // require('./routes/Editor')(store),
         require('./routes/Doc')
      ])
    })
  }
})
