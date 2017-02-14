import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
alert(11111111111111111111)
const defaultMoule = (props) => (
  <div>
    <span>（icon）选择</span>
  </div>
)
const changedMoule = (props) => (
  <div>
    <img src=""/>
  </div>
)
class AssociationModule extends Component {
  
  render(){
    
    return (
      <div>1111</div>
    )
  }
}
// const mapDispatchToProps = {
  
// }

// const mapStateToProps = ({ appsCreate }) => ({
//   initialValues: appsCreate.form,
//   tags: appsCreate.tags,
//   cates: appsCreate.cates
// })

export default connect(
 
)(reduxForm({
  form: 'associationModule',
  fields: [],
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(AssociationModule))