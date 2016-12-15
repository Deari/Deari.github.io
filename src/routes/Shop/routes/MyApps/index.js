import React from 'react'
import { IndexLink, Link } from 'react-router'
import { injectReducer } from '../../../../store/reducers'
class Apps extends React.Component {
  render() {
    return <div>
      <p>这是我的商家应用</p>
      <ul>
        <li><Link to='/shop/manage/apps/1' activeClassName='route--active'>应用1</Link></li>
        <li><Link to='/shop/manage/apps/2' activeClassName='route--active'>应用2</Link></li>
      </ul>
      <Link to='/shop/edit' activeClassName='route--active'>edit</Link>
    </div>
  }
}

export default (store) => ({
  path: 'apps',

  component: Apps,

  //getComponent (nextState, cb) {
  //
  //  require.ensure([], (require) => {
  //    const Shop = require('./containers/ShopContainer').default
  //    const product = require('./modules/product').default
  //    const preview = require('./modules/preview').default
  //
  //    injectReducer(store, { key: 'product', reducer: product })
  //    injectReducer(store, { key: 'preview', reducer: preview })
  //    cb(null, Shop)
  //  })
  //}
})
