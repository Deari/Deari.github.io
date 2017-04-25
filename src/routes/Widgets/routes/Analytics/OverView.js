
export default {
  path: 'analytics/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('business/Analytics/Containers/OverView').default)
    })
  }
}