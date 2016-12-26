import React from 'react'
import Info from '../../components/Apps/Info'
import { injectReducer } from '../../../../store/reducers'
import { reducer as formReducer } from 'redux-form'
//class Create extends React.Component {
//  render() {
//    return <Info />
//  }
//}
//module.exports = {
//  path: 'create',
//  component: Create
//}
//
//const reducers = {
//  // ... your other reducers here ...
//  form: formReducer     // <---- Mounted at 'form'
//}


module.exports = (store) => ({
  path: 'create',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Create = require('./containers/CreateContainer').default
      injectReducer(store, { key: 'form', reducer: formReducer })
      cb(null, Create)
    })
  }
})
