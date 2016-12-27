import React from 'react'
import { IndexLink, Link } from 'react-router'
import Doc from './Doc'
import '../../../../components/Header/Header.scss'

class Container extends React.Component {
  render () {
    return (
      <div className="core-layout__viewport">
        {this.props.children}
      </div>
    )
  }
}

module.exports =  {
  path: 'widgets',
  component: Container,
  indexRoute: {
    component: Doc
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./List'),
        require('./Create')
      ])
    })
  }
}