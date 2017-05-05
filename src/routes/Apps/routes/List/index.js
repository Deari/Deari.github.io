export default {
  path: 'list',
  
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./List2').default)
    })
  }
}