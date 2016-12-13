import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/1',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/1-2').default
      ])
    })
  },

  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        children: require('./components/A').default
      })
    })
  }

})