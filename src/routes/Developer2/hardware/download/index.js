
export default {
  path : 'download',

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        download : require('./download').default
      })
    })
  }
}