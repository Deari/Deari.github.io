import React from 'react'
import { reduxForm } from 'redux-form'
import { validate } from '../../../components2/validate'
import BasicForm from '../../../components2/BasicForm'

export default reduxForm({
  form: 'edit_widgets_basic',
  validate,
  enableReinitialize: true
})(BasicForm)