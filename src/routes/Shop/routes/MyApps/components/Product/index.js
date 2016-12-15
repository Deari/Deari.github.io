import React, { Component, PropTypes } from 'react'
import DragProduct from './DragProduct'

const ProductContainer = ({ products }) => (<ul>
  {products.map((p, i)=> <li key={i}><DragProduct {...p}/></li>)}
</ul>)

ProductContainer.defaultProps = {
  products: []
}

ProductContainer.propTypes = {
  products: PropTypes.array,
}

export default ProductContainer
