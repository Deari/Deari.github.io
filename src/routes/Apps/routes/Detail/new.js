export default {
  path: 'detail/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Detail').default)
    })
  }
}