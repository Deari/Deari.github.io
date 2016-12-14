import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { selectElement } from '../modules/element'
import Element from '../components/Element'

const mapDispatchToProps = {
  selectElement
}

//https://github.com/STRML/react-grid-layout/blob/master/test/examples/1-basic.jsx
export default connect(undefined, mapDispatchToProps)(Element)
