import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import { validate } from '../../../components2/validate'
import BasicForm from '../../../components2/BasicForm'

let BasicFormContainer = reduxForm({
  form: 'create_widgets_basic',
  validate,
  enableReinitialize: true
})(BasicForm)

const selector = formValueSelector('create_widgets_basic') 

BasicFormContainer = connect(state => {
  // can select values individually
  const defaultLayout = selector(state, 'defaultLayout')

  return {
    defaultLayout,
  }

})(BasicFormContainer)

export default BasicFormContainer;