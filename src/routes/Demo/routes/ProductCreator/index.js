export default {
  path: 'product/create',

  getComponent (nextState, cb) {
    require.ensure([], require => {
      const Creator = require('./containers/ProductCreatorContainer').default
      cb(null, Creator)
    })
  }
}
