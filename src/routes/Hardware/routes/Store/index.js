import { injectReducer } from 'store/reducers'
import appStoreReducer from 'reducers/appStore'

module.exports = (store) =>({
  path: 'tag/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, { key: 'appStore', reducer: appStoreReducer })
      cb(null, require('../../Containers/AppStore').default)
    })
  }
})
