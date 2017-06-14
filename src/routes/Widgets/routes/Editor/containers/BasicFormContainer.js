import React from 'react'
import { reduxForm } from 'redux-form'
import { validate } from '../../../components/validate'
import BasicForm from '../../../components/BasicForm'

export default reduxForm({
  form: 'edit_widgets_basic',
  validate,
  enableReinitialize: true
})(BasicForm)