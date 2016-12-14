import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'

import './Product.scss'

const productSource = {
  beginDrag(props) {
    return { name: props.name }
  }
}

const Product = ({ name, imgSrc, width = 1, height = 1, connectDragSource }) =>
  connectDragSource(
    <div>
      <img className={'product-img'}
           src={imgSrc || 'http://placeholder.qiniudn.com/100x50/808080/fff' }
           alt={name}/>
      <span>{name}-{width}x{height}</span>
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
