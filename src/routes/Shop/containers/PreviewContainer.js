import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { DropTarget } from 'react-dnd'
import { addElement } from '../modules/preview'


import Preview from '../components/Preview'

// http://placeholder.qiniudn.com/150x100/4CD964/fff

const mapDispatchToProps = (dispatch) => bindActionCreators({
  //AddElement:
}, dispatch)

const mapStateToProps = state => ({
  preview: state.preview
})

const productTarget = {
  drop(props, monitor, component) {
    props.dispatch(addElement(monitor.getItem()))
  }
}

export default compose(
  connect(mapStateToProps),
  DropTarget('product',
    productTarget, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver           : monitor.isOver(),
      canDrop          : monitor.canDrop(),
    }))
)(Preview)
