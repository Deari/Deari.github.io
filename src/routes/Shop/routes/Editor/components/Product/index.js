import React, { Component, PropTypes } from 'react'
import './Product.scss'


import ProductContainer from './ProductContainer'
import ProductDragLayer from './ProductDragLayer'


const Product = props => (<div>
  <ProductContainer {...props} />
  <ProductDragLayer {...props} />
</div>)

export default Product
