import { login } from 'utils/login'

export default {
  path: 'analytics/:id',
  onEnter: (nextState, replace, callback) => {
    login(() => {
      callback()
    })
  },
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('business/Analytics/containers/OverView').default)
    })
  }
}
