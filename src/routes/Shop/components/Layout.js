import React from 'react'
import { IndexLink, Link } from 'react-router'

class Layout extends React.Component {
  
  render() {
    return <div id="editor-main">
      <div className="editor-left">
        <ul className="sub-nav">
          <li className="sub-nav-active">
            <IndexLink to='/shop' activeClassName='route--active'>
              开发者文档
            </IndexLink>
          </li>
          <li>
            <Link to='/shop/manage' activeClassName='route--active'>
              店铺管理
            </Link>
          </li>
        </ul>
      </div>
      <div>{this.props.children}</div>
    </div>
  }
}

export default Layout;
