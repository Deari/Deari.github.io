import React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderField, { renderTextArea } from './renderField'
import { validate, asyncValidate, repeatCheck }  from '../modules/validate'

const WizardFormFirstPage = (props) => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" component={renderField} 
        label="商家应用名称"  
      />
      <Field name="logo" type="file" component={renderField} label="选择LOGO"/>
      <div>
        <button type="submit" className="next">Next</button>
      </div>
    </form>
  ) 
}

export default reduxForm({
  form: 'wizard',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
  asyncValidate,
  asyncBlurFields: [ 'username' ]
})(WizardFormFirstPage)


