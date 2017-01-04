import React from 'react'
import { connect} from 'react-redux'
import { IndexLink, Link } from 'react-router' 
import { Field, reduxForm } from 'redux-form'

import { toggleStep } from '../modules/edit'
import { 
  renderField, 
  renderTextArea, 
  renderFile,
} from '../../../modules/renderField'

import { validate } from '../modules/validate'

const SecondStepForm = props => {
  const { handleSubmit, submitting, toggleStep, previous, initialValues } = props
  
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

const mapDispatchToProps = {
  toggleStep,
};

const mapStateToProps = ({appsEdit}) => ({
  initialValues: appsEdit.form2,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'editAppStep2',   
  fields: [],
  keepDirtyOnReinitialize: true,
  enableReinitialize: true
  // validate,
})(SecondStepForm))