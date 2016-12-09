import { connect } from 'react-redux'
import { compose } from 'redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { fetchProducts } from '../modules/product'

import Shop from '../components/Shop'

const mapDispatchToProps = {
  fetchProducts
}

const mapStateToProps = state => ({ product: state.product })

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Shop)
