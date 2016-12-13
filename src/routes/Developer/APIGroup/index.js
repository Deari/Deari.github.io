// import { injectReducer } from '../../store/reducers'

export default {
  path : 'Developer/APIGroup',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Developer/APIGroup/Documentation').default
      ])
    })
  },

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        APIGroup: require('./components/APIGroup').default
      })
    })
  }
}

// /kaifshichang/shangjiangxin/dian