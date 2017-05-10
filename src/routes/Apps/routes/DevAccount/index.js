import { login } from 'utils/login'

export default {
  path: 'account',
  
  onEnter: (nextState, replace, callback) => {
    login(()=>{
      callback()
    })
  },

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Container').default)
    })
  }
}
