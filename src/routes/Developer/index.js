import List from './businessList/list';

export default (store) => ({
  path: 'developer',
  getComponent (nextState, cb) {
    cb(null, List)
  }
})