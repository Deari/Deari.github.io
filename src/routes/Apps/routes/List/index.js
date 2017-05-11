import Main from './main'
import { login } from 'utils/login'

export default {
  path: 'list',
  onEnter: (nextState, replace, callback) => {
    login(() => {
      callback()
    })
  },
  indexRoute: {
    component: Main
  },
  // getComponent (nextState, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, require('./List2').default)
  //   })
  // },

  childRoutes: [
    { path: ':type', component: Main }
    // { path: 'all', component: List },
    // { path: 'reviewed', component: List },
    // { path: 'wait_review', component: List },
    // { path: 'wait_submit', component: List }
  ]
}
