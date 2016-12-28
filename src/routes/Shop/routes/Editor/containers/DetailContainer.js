import { connect } from 'react-redux'
import Detail from '../components/Detail'
import { saveDetail, savePage } from '../modules/detail'

const mapStateToProps = state => ({
  detail: state.detail
})

const mapDispatchToProps = {
  saveDetail,
  savePage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
