import { injectReducer } from '../../store/reducers'

const Test = ()=>(<div>This is a Test.</div>);

export default (store) => ({
  path : 'demo',
  // component: Test,

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