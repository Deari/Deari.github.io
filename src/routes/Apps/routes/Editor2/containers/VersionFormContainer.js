import React from 'react'
import { reduxForm } from 'redux-form'
// import { validate } from '../../../components2/validate'
import VersionForm from '../../../components2/VersionForm'

export default reduxForm({
  form: 'edit_apps_version',
  // validate,
  enableReinitialize: true
})(VersionForm)