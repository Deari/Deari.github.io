import React, { Component, PropTypes } from 'react'
import './Product.scss'

const Product = (props) => {
  const { appName, defaultLayout, appLogo } = props
  return <div className="component">
    <div className="img">
      <img className={'product-img'}
           height={50}
           src={appLogo || 'http://placeholder.qiniudn.com/100x100/#808080/fff' }
           alt={appName}/>
    </div>
    <span className="text">{appName}-{defaultLayout.w}x{defaultLayout.h}</span>
  </div>
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Product
