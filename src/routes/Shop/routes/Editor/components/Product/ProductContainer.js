import React, { Component, PropTypes } from 'react'
import DragProduct from './DragProduct'

const ProductContainer = ({ products }) => (<ul className="gui-list clx">
  {products.map((p, i)=> <li key={i}><div className="img"><DragProduct {...p}/></div></li>)}
</ul>)

ProductContainer.defaultProps = {
  products: []
}

ProductContainer.propTypes = {
  products: PropTypes.array,
}

export default ProductContainer
