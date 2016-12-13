// import { injectReducer } from '../../store/reducers'

export default {
  path : 'Developer-storeGroup',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/1-2-3').default
      ])
    })
  },

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        storeGroup: require('./components/storeGroup').default
      })
    })
  }
}

// /kaifshichang/shangjiangxin/dian