import React, { Component, PropTypes } from 'react'
import DragProduct from './DragProduct'


export class ProductContainer extends Component {

  componentDidMount() {
    setTimeout(this.props.fetchProducts, 1000)
  }

  render() {
    const { products = [] } = this.props.product
    return <div className="gui-container">
      <h3 className="gui-title">通用大模块</h3>
      <ul className="gui-list">
        {products
          .filter(e=> e.defaultLayout.w !== 1)
          .map((p, i) => <li className="items" key={i}>
          <DragProduct {...p}/>
        </li>)}
      </ul>
      <h3 className="gui-title">功能小模块</h3>
      <ul className="gui-list">
        {products
          .filter(e=> e.defaultLayout.w === 1)
          .map((p, i) => <li className="items" key={i}>
          <DragProduct {...p}/>
        </li>)}
      </ul>
      </div>
  }
}

ProductContainer.defaultProps = {
  product: {
    products: []
  }
}

ProductContainer.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductContainer
