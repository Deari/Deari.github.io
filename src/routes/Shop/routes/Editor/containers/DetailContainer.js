import { connect } from 'react-redux'
import Detail from '../components/Detail'
import { saveDetail } from '../modules/detail'

const mapStateToProps = state => ({
  detail: state.detail
})

const mapDispatchToProps = {
  saveDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
