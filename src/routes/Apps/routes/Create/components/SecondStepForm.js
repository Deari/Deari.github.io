import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'

import renderField, { renderTextArea, renderFile } from '../modules/renderField'
import { validate } from '../modules/validate'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'

import { toggleStep } from '../modules/create'

class SecondStepForm extends React.Component {

  render(){

    const { handleSubmit, pristine, submitting, toggleStep } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field name="codeDesc" component={renderTextArea} label="文字介绍" />
        <Field name="file" component={renderFile} label="应用文件" />

        <div className="form-btn">
          <div>
            <button type="button" className="previous" onClick={()=>toggleStep(1)}>上一步</button>
            <button type="submit" className="next" disabled={submitting}> 提交</button>
          </div>
        </div>
      </form>
    )
  }

}

const mapDispatchToProps = {
  toggleStep,
};

export default connect(
  state=>({
    initialValues: state.appsCreate.form2,
  }),

  mapDispatchToProps

)(reduxForm({
  form: 'secondStepForm',   
  fields: ['appName', 'appDesc'],
  // validate,
})(SecondStepForm))