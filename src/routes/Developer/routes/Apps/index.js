import React from 'react'
import { IndexLink, Link } from 'react-router'
import Doc from './Doc'
import '../../../../styles/_base.scss'
import '../../../../components/Header/Header'
import '../../../Open/routes/Apps/index.scss'

class Container extends React.Component {
  render () {
    return (
      <div className="core-layout__viewport">
        {this.props.children}
      </div>
    )
  }
}

module.exports = store => ({
  path: 'apps',
  component: Container,
  indexRoute: {
    component: Doc
  },

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./List'),
        require('./Create')(store),
        require('./Detail'),
        require('./Edit')
      ])
    })
  }
})
