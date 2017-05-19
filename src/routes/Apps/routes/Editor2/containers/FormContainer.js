import React from 'react'
import { reduxForm } from 'redux-form'
import { validate } from 'business/AppCreate/validate'
import BasicForm from 'business/AppCreate/Form'

export default reduxForm({
  form: 'edit_apps_basic',
  validate,
  enableReinitialize: true
})(BasicForm)