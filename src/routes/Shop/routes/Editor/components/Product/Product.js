import React, { Component, PropTypes } from 'react'

const Product = (props) => {
  const { appName, defaultLayout, appLogo, hideName } = props
  return ( 
    <div className="component">
      <img className={'product-img'}
            height={50}
            src={appLogo || 'http://placeholder.qiniudn.com/100x100/#808080/fff' }
            alt={appName}/>
      { <span className="text">{appName}</span>}
      { <span className="text">{defaultLayout.w}x{defaultLayout.h}</span> }
    </div>
  )
}

Product.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default Product
