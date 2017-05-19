import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { validate } from 'business/AppCreate/validate'
import BasicForm from 'business/AppCreate/Form'

export default reduxForm({
  form: 'create_apps_basic',
  validate,
  enableReinitialize: true
})(BasicForm)