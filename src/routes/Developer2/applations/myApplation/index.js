// import { injectReducer } from '../../store/reducers'

export default {
  path : 'list',

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        myApplation: require('./myApplation').default
      })
    })
  }
}