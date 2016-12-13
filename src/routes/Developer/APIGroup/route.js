export default {
  path : 'Developer/APIGroup/Documentation',

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        C: require('./components/Documentation').default
      })
    })
  }
}