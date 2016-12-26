import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'



const productSource = {
  beginDrag(props) {
    const { name, productId, type, defaultLayout, moduleName, moduleType} = props
    return {
      name, productId, type, defaultLayout, moduleName, moduleType
    }
  }
}

const Product = ({ name, imgSrc, defaultLayout, connectDragSource }) =>
  connectDragSource(
      <img className={'product-img'}
           height={50}
           src={imgSrc || 'http://placeholder.qiniudn.com/100x100/808080/fff' }
           alt={name}/>
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
