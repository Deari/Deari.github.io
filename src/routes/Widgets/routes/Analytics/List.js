import { login } from 'utils/login'
import { withTheme } from 'business/HOCs/theme'

export default {
  path: 'analytics',
  onEnter: (nextState, replace, callback) => {
    login(() => {
      callback()
    })
  },
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const List = require('business/Analytics/containers/List').default;
      cb(null, withTheme('widgets')(List))
    })
  }
}
