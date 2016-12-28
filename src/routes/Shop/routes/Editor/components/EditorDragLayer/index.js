import React, { Component, PropTypes } from 'react'
import { DragLayer } from 'react-dnd'
import Product from '../Product/Product'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  background: "cyan",
  opacity: 0.4,
}

function getItemStyles(props) {
  const currentOffset = props.currentOffset;
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }

  const transform = `translate(${currentOffset.x}px, ${currentOffset.y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  }
}

export class EditorDragLayer extends Component {

  render() {
    const { item, itemType, isDragging } = this.props
    if (!isDragging) {
      return null
    }
    return <div style={layerStyles}>
      <div style={getItemStyles(this.props)}>
        <div>
          <Product {...item}/>
        </div>
      </div>
    </div>
  }

}

EditorDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

export default DragLayer(collect)(EditorDragLayer)
