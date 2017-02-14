import React, { Component, PropTypes } from 'react'
alert(11111)
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
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
         <div>
      <div>
        <Field id="isShow" component="input" type="checkbox" />
        <label htmlFor="isShow">应用</label>
        <div>
          {defaultMoule()}
        </div>
      </div>
      <div>
        <Field id="isShow" component="input" type="checkbox" />
        <label htmlFor="isShow">组件</label>
        <div>
          {defaultMoule()}
        </div>
      </div>
       <div>
        <Field id="isShow" component="input" type="checkbox" />
        <label htmlFor="isShow">硬件</label>
        <div>
          {defaultMoule()}
        </div>
      </div>
    </div>
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
  form: 'AssociationModule',
  fields: [],
  forceUnregisterOnUnmount: true,
})(AssociationModule))