import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'

import './Product.scss'

const productSource = {
  beginDrag(props) {
    const { name, productId, type, defaultLayout} = props
    return {
      name, productId, type, defaultLayout
    }
  }
}

const Product = ({ name, imgSrc, defaultLayout, connectDragSource }) =>
  connectDragSource(
    <div>
      <img className={'product-img'}
           width={100}
           src={imgSrc || 'http://placeholder.qiniudn.com/100x50/808080/fff' }
           alt={name}/>
      <span>{name}-{defaultLayout.w}x{defaultLayout.h}</span>
    </div>
  )

Product.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  name             : PropTypes.string.isRequired,
  width            : PropTypes.number,
  height           : PropTypes.number,
}

export default DragSource('product', productSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging       : monitor.isDragging()
}))(Product)