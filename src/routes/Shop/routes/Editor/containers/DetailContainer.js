import { connect } from 'react-redux'
import Detail from '../components/Detail'
import { saveDetail, savePage, deleteElement, cancelElement, editElement } from '../modules/detail'

const mapStateToProps = state => ({
  detail: state.detail
})

const mapDispatchToProps = {
  saveDetail,
  savePage,
  deleteElement,
  cancelElement,
  editElement
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
