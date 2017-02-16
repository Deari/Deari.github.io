import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { DropTarget } from 'react-dnd'
import { addElement, setLayout, selectElement, fetchPreview } from '../modules/preview'

import Preview from '../components/Preview'

// http://placeholder.qiniudn.com/150x100/4CD964/fff

const mapStateToProps = state => ({
  preview: state.preview
})

const mapDispatchToProps = dispatch => ({
  setLayout(layouts) {
    dispatch(setLayout({layouts: layouts}))
  },
  selectElement(id) {
    dispatch(selectElement(id))
  },
  fetchPreview() {
    dispatch(fetchPreview())
  },
  dispatch,
})

const productTarget = {
  drop(props, monitor, component) {
    console.log("addElement", monitor.getItem());
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
