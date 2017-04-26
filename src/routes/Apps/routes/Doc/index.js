
export default {
  path: 'doc',
  
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Doc').default)
    })
  }
}