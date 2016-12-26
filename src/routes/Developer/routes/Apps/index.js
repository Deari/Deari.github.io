import React from 'react'
import { IndexLink, Link } from 'react-router'
import Doc from './Doc'
import '../../../../styles/_base.scss'
import '../../../../components/Header/Header'

class Container extends React.Component {
  render () {
    return (
      <div className="core-layout__viewport bg-gray">
        {this.props.children}
      </div>
    )
  }
}

module.exports =  {
  path: 'apps',
  component: Container,
  indexRoute: {
    component: Doc
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./List'),
        require('./Create'),
        require('./Detail'),
        require('./Edit')
      ])
    })
  }
}
