import React from 'react'
import { connect} from 'react-redux'
import { IndexLink, Link } from 'react-router' 
import { Field, reduxForm } from 'redux-form'

import { toggleStep } from '../../../modules/model'
import { 
  renderField, 
  renderTextArea, 
  renderFile,
} from '../../../modules/renderField'

import { validate } from '../modules/validate'


class SecondStepForm extends React.Component {

  render(){

    const { handleSubmit, submitting, toggleStep, initialValues,
      previous } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="codeDesc" component={renderTextArea} label="文字介绍" />
        <Field name="file" component={renderFile} label="应用文件" />

        <div className="form-btn">
          <div>
            <button type="button" className="previous" onClick={previous}>上一步</button>
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
  keepDirtyOnReinitialize: true,
  enableReinitialize: true
  // validate,
})(SecondStepForm))