export default {
  path : 'list',

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        MYApi: require('./myAPI').default
      })
    })
  }
}