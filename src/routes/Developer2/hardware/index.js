// import { injectReducer } from '../../store/reducers'

export default {
  path : 'hardware',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Documentation').default,
        require('./myhardware').default,
        require('./download').default
      ])
    })
  },

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        hardware: require('./hardware').default
      })
    })
  }
}

// /kaifshichang/shangjiangxin/dian