import React from 'react'
import { IndexLink, Link } from 'react-router'

// import './Shop.scss'

export const Shop = (props) => (
  <div id="editor-main">
    <div className="editor-left">
      <ul className="sub-nav">
        <li className="sub-nav-active">
          <IndexLink to='/shop/manage' activeClassName='route--active'>
            我的店铺
          </IndexLink>
        </li>

        <li>
          <Link to='/shop/manage/apps' activeClassName='route--active'>
            我的商家应用
          </Link>
        </li>

        <li>
          <Link to='/shop/manage/widgets' activeClassName='route--active'>
            我的店铺组件
          </Link>
        </li>

        <li>
          <Link to='/shop/manage/hardware' activeClassName='route--active'>
            我的硬件
          </Link>
        </li>
      </ul>
    </div>
    <div>{props.children}</div>
  </div>
)

export default Shop

Shop.propTypes = {
  products: PropTypes.array
}
