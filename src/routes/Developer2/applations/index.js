// import { injectReducer } from '../../store/reducers'

export default {
  path : 'applations',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Documentation').default,
        require('./myApplation').default
      ])
    })
  },

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        applation: require('./applation').default,
      })
    })
  }
}

// /kaifshichang/shangjiangxin/dian