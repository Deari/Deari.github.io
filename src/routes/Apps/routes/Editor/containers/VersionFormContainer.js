import React from 'react'
import { reduxForm } from 'redux-form'
import { validateVersionForm } from '../../../components/validate'
import VersionForm from '../../../components/VersionForm'

export default reduxForm({
  form: 'edit_apps_version',
  validate: validateVersionForm,
  enableReinitialize: true
})(VersionForm)