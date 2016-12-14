// import { injectReducer } from '../../store/reducers'

export default {
  path : 'list',

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        myhardware: require('./myhardware').default
      })
    })
  }
}