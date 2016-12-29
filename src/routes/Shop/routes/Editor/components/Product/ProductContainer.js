import React, { Component, PropTypes } from 'react'
import DragProduct from './DragProduct'


export class ProductContainer extends Component {

  componentDidMount() {
    setTimeout(function () {
      this.props.fetchProducts()
    }.bind(this), 1000)
  }

  render() {
    const { products = [] } = this.props.product
    console.log(products)
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
