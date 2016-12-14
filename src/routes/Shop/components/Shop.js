import React, { Component, PropTypes } from 'react'
import './Shop.scss'

import Product from '../containers/ProductContainer'
import Preview from '../containers/PreviewContainer'

export class Shop extends Component {

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const { product } = this.props

    return <div id="editor-main">
      <div className="editor-left">
        <ul className="sub-nav">
          <li className="sub-nav-active">页面</li>
          <li>图层</li>
        </ul>

        <div>
          <Product {...product}/>
        </div>
      </div>
      <div className="editor-view">
        <button onClick={::this.props.fetchProducts}>fetch</button>
        <Preview/>
      </div>
      <div className="editor-right">
        right
      </div>
    </div>
  }
}
export default Shop

Shop.propTypes = {
  products: PropTypes.array
}
