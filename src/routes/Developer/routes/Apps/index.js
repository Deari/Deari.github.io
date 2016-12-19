import React from 'react'
import { IndexLink, Link } from 'react-router'
import Doc from './Doc'
import '../../../../styles/_base.scss'
import '../../../../components/Header/Header'

class Container extends React.Component {
  render () {
    return <div className="bg-gray">
      <div className="container pb10">
       <div className="row clx">
           <div className="col-md-10 col-md-offset-2">
              <ul className="nav navbar-nav clx">
                <li>
                  <IndexLink to='/developer/apps' activeClassName='route--active'>
                  开发者文档
                  </IndexLink>
                </li>
                <li>
                  <Link to='/developer/apps/list' activeClassName='route--active'>
                  我的应用
                  </Link>
                </li>
              </ul>
           </div>
       </div>
      </div>
      <div className="container">
        <div className="row">
          {this.props.children}
        </div>
      </div>
    </div>
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
