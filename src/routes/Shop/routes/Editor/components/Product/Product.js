import React, { Component, PropTypes } from 'react'
import './Product.scss'

const Product = ({ appName, appThumb, defaultLayout }) =>
  <div>
    <img className={'product-img'}
         height={50}
         src={appThumb || 'http://placeholder.qiniudn.com/100x100/808080/fff' }
         alt={appName}/>
    {/*<span>{name}-{defaultLayout.w}x{defaultLayout.h}</span>*/}
  </div>

Product.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Product
