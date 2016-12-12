import App from './app';

export default (store) => ({
  path: 'developer/create/businessApp',
  getComponent (nextState, cb) {
    cb(null, App)
  }
})