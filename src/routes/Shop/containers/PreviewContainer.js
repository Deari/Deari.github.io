import { connect } from 'react-redux'
import { compose } from 'redux'
import { DropTarget } from 'react-dnd'

import Preview from '../components/Preview'

// http://placeholder.qiniudn.com/150x100/4CD964/fff

const productTarget = {
  drop() {
    return { name: 'Dustbin' };
  }
}

export default compose(
  DropTarget('product',
    productTarget, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver           : monitor.isOver(),
      canDrop          : monitor.canDrop()
    })),
  connect()
)(Preview)
