// import { injectReducer } from '../../store/reducers'

export default {
  path : '1-2',

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/1-2-3').default
      ])
    })
  },

  getComponents (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        B: require('./components/B').default
      })
    })
  }
}

// /kaifshichang/shangjiangxin/dian
