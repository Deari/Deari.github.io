<<<<<<< HEAD
const Test = ()=>(<div>This is a Test.</div>);

export default (store) => ({
  path : 'demo',
  indexRoute: {
    component: Test
  },

=======
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
>>>>>>> master
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/1-2').default,
<<<<<<< HEAD
        require('./routes/ProductCreator').default
=======
        require('./routes/ProductCreator')(store),
>>>>>>> master
        require('./routes/Counter')(store)
      ])
    })
  }
})
