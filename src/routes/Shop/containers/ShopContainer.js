import { connect } from 'react-redux'
import { compose } from 'redux'
import { fetchProducts } from '../modules/product'
//import { compose } from 'redux'
//
//export default compose(
//  DropTarget(dragTypes, storyTarget, collect),
//  connect(mapStateToProps)
//)(StoryEditor);


import Shop from '../components/Shop'

const mapDispatchToProps = {
  fetchProducts
}

const mapStateToProps = state => ({ product: state.product })

//export default Shop
export default connect(mapStateToProps, mapDispatchToProps)(Shop)
