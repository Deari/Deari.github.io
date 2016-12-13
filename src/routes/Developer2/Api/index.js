//import { injectReducer } from '../../store/reducers'

export default {
  path : 'api',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Documentation').default,
        require('./myAPI').default
      ])
    })
  },

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        Api: require('./Api').default
      })
    })
  }
}

// /kaifshichang/shangjiangxin/dian