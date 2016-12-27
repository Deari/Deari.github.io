import { connect } from 'react-redux'
import Product from '../components/Product'
import { fetchProducts } from '../modules/product'


const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = {
  fetchProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
