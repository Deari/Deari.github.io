import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'

import './Product.scss'

const productSource = {
  beginDrag(props) {
    const { name, productId, type, w, h } = props
    return {
      name, productId, type, w, h
    }
  }
}

const Product = ({ name, imgSrc, w = 1, h = 1, connectDragSource }) =>
  connectDragSource(
    <div>
      <img className={'product-img'}
           width={100}
           src={imgSrc || 'http://placeholder.qiniudn.com/100x50/808080/fff' }
           alt={name}/>
      <span>{name}-{w}x{h}</span>
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
