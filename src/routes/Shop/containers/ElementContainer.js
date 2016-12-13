import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { selectElement } from '../modules/element'
import Element from '../components/Element'

const mapDispatchToProps = {
  selectElement
}

export default connect(undefined, mapDispatchToProps)(Element)
//export default Element
