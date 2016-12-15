// import { injectReducer } from '../../store/reducers'

export default {
  path : '1-2-3',

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        C: require('./components/C').default
      })
    })
  }
}