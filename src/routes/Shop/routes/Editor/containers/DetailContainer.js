import { connect } from 'react-redux'
import Detail from '../components/Detail'


const mapStateToProps = state => ({
  detail: state.detail
})

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps)(Detail)
