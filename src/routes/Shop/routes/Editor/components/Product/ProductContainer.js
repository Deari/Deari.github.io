import React, { Component, PropTypes } from 'react'
import DragProduct from './DragProduct'


export class ProductContainer extends Component {

  componentDidMount() {
    setTimeout(this.props.fetchProducts, 1000)
  }

  render() {
    const { products = [] } = this.props.product
    return <ul className="gui-list">
      {products.map((p, i) => <li className="items" key={i}>
        <DragProduct {...p}/>
      </li>)}
    </ul>
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
