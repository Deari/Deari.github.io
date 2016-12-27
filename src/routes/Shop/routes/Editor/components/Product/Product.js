import React, { Component, PropTypes } from 'react'
import './Product.scss'

const Product = ({ name, imgSrc, defaultLayout }) =>
  <div>
    <img className={'product-img'}
         height={50}
         src={imgSrc || 'http://placeholder.qiniudn.com/100x100/808080/fff' }
         alt={name}/>
    {/*<span>{name}-{defaultLayout.w}x{defaultLayout.h}</span>*/}
  </div>

Product.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Product
