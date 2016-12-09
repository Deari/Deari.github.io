import { connect } from 'react-redux'
import { compose } from 'redux'
import { DragSource } from 'react-dnd'

import Product from '../components/Product'

// http://placeholder.qiniudn.com/150x100/4CD964/fff

const productSource = {
  beginDrag(props) {
    return { name: props.name }
  }
}

export default compose(
  DragSource('product',
    productSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging       : monitor.isDragging(),
    })),
  connect()
)(Product)
