export default {
  path : 'doc',

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        Documentation: require('./Documentation').default
      })
    })
  }
}