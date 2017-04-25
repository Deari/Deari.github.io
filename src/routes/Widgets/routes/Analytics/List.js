export default {
  path: 'analytics',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('business/Analytics/Containers/List').default)
    })
  }
}
