import { login } from 'utils/login'

export default {
  path: 'analytics',
  onEnter: (nextState, replace, callback) => {
    console.log(11112222);
    login(() => {
      callback()
    })
  },
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('business/Analytics/Containers/List').default)
    })
  }
}
