import React from 'react'

export default (store) => ({
  path: 'widgets',
  indexRoute: {
    getComponents(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, {
          children: require('./Containers/AppStore').default
        })
      })
    }
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
        require('./routes/Analytics/List').default,
        require('./routes/Analytics/OverView').default
      ])
    })
  }
})
