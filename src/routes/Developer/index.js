import React from 'react'
import { IndexLink, Link } from 'react-router'


class App extends React.Component {
  render() {
    return <div>
      <Link to='/developer/applations' activeClassName='route--active'>
      商家应用
      </Link>——
      <Link to='/developer/components' activeClassName='route--active'>
      店铺组件
      </Link>——
      <Link to='/developer/api' activeClassName='route--active'>
      API
      </Link>——
      <Link to='/developer/hardware' activeClassName='route--active'>
      开放硬件
      </Link>
    </div>
  }
}

export default (store) => ({
  path: 'developer',

  // getChildRoutes(partialNextState, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, [
  //       require('./routes/1-2-3').default
  //     ])
  //   })
  // },

  getComponent (nextState, cb) {
    cb(null, App)
  }
})
