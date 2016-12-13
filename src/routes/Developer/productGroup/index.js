// import { injectReducer } from '../../store/reducers'

export default {
  path : 'Developer-productGroup',

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
        productGroup: require('./components/productGroup').default
      })
    })
  }
}

// /kaifshichang/shangjiangxin/dian