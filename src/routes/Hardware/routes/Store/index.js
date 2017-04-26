export default {
  path: 'tag/:id',
  
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('../../Containers/AppStore').default)
    })
  }
}