import { connect } from 'react-redux'
import { compose } from 'redux'
import { DragDropContext } from 'react-dnd'
//import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend';

import { fetchProducts } from '../modules/product'

import Editor from '../components/MobileEditor'

const mapDispatchToProps = {
  fetchProducts
}

const mapStateToProps = state => ({ product: state.product })

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(TouchBackend)
)(Editor)
