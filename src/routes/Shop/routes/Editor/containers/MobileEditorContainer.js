//import { connect } from 'react-redux'
import { compose } from 'redux'
import { DragDropContext } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend';

import Editor from '../components/MobileEditor'

//const mapDispatchToProps = {
//  fetchProducts
//}

//const mapStateToProps = state => ({
//  product: state.product
//})

export default compose(
  DragDropContext(TouchBackend)
)(Editor)
