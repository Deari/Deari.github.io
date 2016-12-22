import React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderField, { renderTextArea } from './renderField'
import { validate } from '../modules/validate'

const WizardFormSecondPage = (props) => {
  const { handleSubmit, pristine, submitting, previousPage } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="desc" component={renderTextArea} label="文字介绍"/>
      <div>
        <button type="button" className="previous" onClick={previousPage}>Previous</button>
        <button type="submit" className="next" disabled={pristine||submitting}> 提交</button>
      </div>
    </form>
  ) 
}

export default reduxForm({
  form: 'wizard',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
  validate
})(WizardFormSecondPage)


