import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'

import renderField, { renderTextArea, renderFile } from '../modules/renderField'
import { validate } from '../modules/validate'

import { toggleStep } from '../modules/edit'

class SecondStepForm extends React.Component {

  render(){

    const { handleSubmit, submitting, toggleStep } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field name="codeDesc" component={renderTextArea} label="文字介绍" />
        <Field name="file" component={renderFile} label="组件文件" />

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
    initialValues: state.widgetEdit.form2,
  }),

  mapDispatchToProps

)(reduxForm({
  form: 'widgetsEditStep2',   
  fields: ['appName', 'appDesc'],
  keepDirtyOnReinitialize: true,
  enableReinitialize: true
  // validate,
})(SecondStepForm))