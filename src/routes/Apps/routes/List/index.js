import List from './containers/ListContainer'

export default {
  path: 'list',
  
  indexRoute: {
    component: List
  },
  // getComponent (nextState, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, require('./List2').default)
  //   })
  // },

  childRoutes: [
    { path: ':type', component: List },
    // { path: 'all', component: List },
    // { path: 'reviewed', component: List },
    // { path: 'wait_review', component: List },
    // { path: 'wait_submit', component: List }
  ],
}