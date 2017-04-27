export default (store) => ({
  path: 'demo',
  indexRoute: {
    getComponents(nextState, cb) {
      require.ensure([], (require) => {
        cb(null, {
          children: require('./components/A').default
        })
      })
    }
  },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/1-2').default,
        require('./routes/ProductCreator')(store),
        require('./routes/Counter')(store)
      ])
    })
  }
})
