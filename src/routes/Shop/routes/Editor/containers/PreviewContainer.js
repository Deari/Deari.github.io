import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { DropTarget } from 'react-dnd'
import { addElement, setLayout, selectElement, fetchPreview,
cancelElement } from '../modules/preview'
import { getRandomString } from 'components/utils'

import Preview from '../components/Preview'

// http://placeholder.qiniudn.com/150x100/4CD964/fff

const mapStateToProps = state => ({
  preview: state.preview
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setLayout(layouts) {
    dispatch(setLayout({layouts: layouts}))
  },
  selectElement(id) {
    dispatch(selectElement(id))
  },
  fetchPreview(pageID) {
    dispatch(fetchPreview(pageID))
  },
  cancelElement() {
    dispatch(cancelElement())
  },
  dispatch,
})

const productTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    console.log("addElement", item);
    item.id = getRandomString({})+"_"+Date.now(),
    props.dispatch(addElement(item))
    props.scrollIntoView()
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
