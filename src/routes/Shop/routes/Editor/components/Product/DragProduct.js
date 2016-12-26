import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'
import Product from './Product'

const productSource = {
  beginDrag(props) {
    const { name, productId, type, defaultLayout, moduleName, moduleType} = props
    return {...props}
    //return {
    //  name, productId, type, defaultLayout, moduleName, moduleType
    //}
  }
}
const DragProduct = ({connectDragSource, ...props}) => connectDragSource(<div><Product {...props}/></div>)

export default DragSource('product', productSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging       : monitor.isDragging()
}))(DragProduct)
