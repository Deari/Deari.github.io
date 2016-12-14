import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { DropTarget } from 'react-dnd'
import { addElement, setLayout } from '../modules/preview'


import Preview from '../components/Preview'

// http://placeholder.qiniudn.com/150x100/4CD964/fff

const mapStateToProps = state => ({
  preview: state.preview
})


const mapDispatchToProps = dispatch => ({
  setLayout(layout) {
    dispatch(setLayout({layout: layout}))
  }
})

const productTarget = {
  drop(props, monitor, component) {
    props.dispatch(addElement(monitor.getItem()))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget('product',
    productTarget, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver           : monitor.isOver(),
      canDrop          : monitor.canDrop(),
    }))
)(Preview)
