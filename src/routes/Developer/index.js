import React from 'react'


class App extends React.Component {
  render() {
    return <div>Appdf</div>
  }
}

export default (store) => ({
  path: 'developer',


  getComponent (nextState, cb) {
    cb(null, App)
  }
})
