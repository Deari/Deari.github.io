import React, { Component, PropTypes } from 'react'
import './Editor.scss'

import Product from '../../containers/ProductContainer'
import Preview from '../../containers/PreviewContainer'

export class Editor extends Component {

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const { product } = this.props

    return <div id="editor-main">
      <div className="editor-left">
        <ul className="sub-nav">
          <li className="sub-nav-active">我的店铺组件</li>
        </ul>
        <div className="sub-content">
          <Product {...product}/>
        </div>
        <ul className="sub-nav">
          <li className="sub-nav">更多店铺组件</li>
        </ul>
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

export default Editor


Editor.propTypes = {
  products: PropTypes.array
}
