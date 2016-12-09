import React, { Component, PropTypes } from 'react'
import './Shop.scss'

export class Shop extends Component {


  render() {
    const props = this.props
    console.log("_____________________")
    console.log(props)
    //const products = props.fetchProducts


    return <div id="editor-main">
      <div className="editor-left">
        <ul className="sub-nav">
          <li className="sub-nav-active">页面</li>
          <li>图层</li>
        </ul>

        <div>

        </div>

        {JSON.stringify(this.props.product)}
      </div>
      <div className="editor-view">
        asdfas   <button onClick={::this.props.fetchProducts}>fetch</button>
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
