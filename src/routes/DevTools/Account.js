export default {
  path: 'account',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../ApplyAccount/Container').default)
    })
  }
}
