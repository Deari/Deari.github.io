import { connect } from 'react-redux'
import Product from '../components/Product'
import { fetchProducts } from '../modules/product'

// http://placeholder.qiniudn.com/150x100/4CD964/fff


const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = {
  fetchProducts
}



export default connect(mapStateToProps, mapDispatchToProps)(Product)
