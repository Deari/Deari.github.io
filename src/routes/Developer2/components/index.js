// import { injectReducer } from '../../store/reducers'

export default {
  path : 'components',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Documentation').default,
        require('./myComponet').default
      ])
    })
  },

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        components: require('./components').default
      })
    })
  }
}

// /kaifshichang/shangjiangxin/dian