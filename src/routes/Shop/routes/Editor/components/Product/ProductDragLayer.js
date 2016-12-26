import React, {Component, PropTypes} from 'react'
import { DragLayer } from 'react-dnd'

export class ProductDragLayer extends Component {

  render() {
    const { item, itemType, isDragging } = this.props
    if (!isDragging) {
      return null
    }
    return <div>aaaa</div>
  }

}


ProductDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(ProductDragLayer)
