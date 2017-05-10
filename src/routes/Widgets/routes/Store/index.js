import { injectReducer } from 'store/reducers'
import appStoreReducer from 'reducers/appStore'

module.exports = (store) => ({
  path: 'tag/:id',
  getComponent (nextState, cb) {
    injectReducer(store, { key: 'appStore', reducer: appStoreReducer })
    require.ensure([], (require) => {
      cb(null, require('../../Containers/AppStore').default)
    })
  }
})