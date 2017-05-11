const Test = () => (<div>This is a Test.</div>)

export default (store) => ({
  path : 'demo',
  indexRoute: {
    component: Test
  },

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/1-2').default,
        require('./routes/ProductCreator').default,
        require('./routes/Counter')(store)
      ])
    })
  }
})
