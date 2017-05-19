import React from 'react'
import { reduxForm } from 'redux-form'
import { validate } from '../../../components2/validate'
import BasicForm from '../../../components2/AppBasicForm'

export default reduxForm({
  form: 'edit_apps_basic',
  validate,
  enableReinitialize: true
})(BasicForm)