import React, { Component, PropTypes } from 'react'
import './Product.scss'

const Product = ({ name, imgSrc, width = 1, height = 1 }) => (
  <div>
    <img className={'product-img'}
         src={imgSrc || 'http://placeholder.qiniudn.com/100x50/808080/fff' }
         alt={name}/>
    <span>{name}-{width}x{height}</span>
  </div>
)

Product.propTypes = {
  name  : PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  width : PropTypes.number,
  height: PropTypes.number,
}

const ProductContainer = ({ products }) => (<ul>
  {products.map((p, i)=> <li key={i}><Product {...p}/></li>)}
</ul>)

ProductContainer.defaultProps = {
  products: []
}

ProductContainer.propTypes = {
  products: PropTypes.array,
}

export default ProductContainer
