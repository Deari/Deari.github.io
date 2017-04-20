export default {
  path: 'applyAccount',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Container').default)
    })
  }
}
