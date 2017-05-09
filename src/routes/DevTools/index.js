export default {
  path: 'devtools',
  indexRoute: {
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        cb(null, require('./Main').default)
      })
    },
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Account').default,
        require('./DevInfo').default
      ])
    })
  }
}
