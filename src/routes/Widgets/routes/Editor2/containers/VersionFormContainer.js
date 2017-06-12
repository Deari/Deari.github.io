import React from 'react'
import { reduxForm } from 'redux-form'
import { validateVersionForm } from '../../../components2/validate'
import VersionForm from '../../../components2/VersionForm'

export default reduxForm({
  form: 'edit_widgets_version',
  validate: validateVersionForm,
  enableReinitialize: true
})(VersionForm)