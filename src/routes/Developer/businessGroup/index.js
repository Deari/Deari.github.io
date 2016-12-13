// import { injectReducer } from '../../store/reducers'

export default {
  path : 'Developer-businessGroup',

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
        businessGroup: require('./components/businessGroup').default,
      })
    })
  }
}

// /kaifshichang/shangjiangxin/dian