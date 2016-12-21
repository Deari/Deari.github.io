import React from 'react'
import { IndexLink, Link } from 'react-router'
import Doc from '../../components/widgets/Doc'
import '../../../../components/Header/Header.scss'

class Container extends React.Component {
  render () {
    return <div className="bg-gray">
      <div className="container">
       <div className="row clx">
           <div className="col-md-10 col-md-offset-2">
              <ul className="nav navbar-nav clx">
                <li>
                  <IndexLink to='/developer/widgets' activeClassName='route--active'>
                  开发者文档
                  </IndexLink>
                </li>
                <li>
                  <Link to='/developer/widgets/list' activeClassName='route--active'>
                  我的组件
                  </Link>
                </li>
              </ul>
           </div>
       </div>
      </div>
      <div className="container pt10">
        <div className="row">
          {this.props.children}
        </div>
      </div>
    </div>
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