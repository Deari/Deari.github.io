import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'

import { renderTextArea, renderFile } from '../../../modules/renderField'
import { validate } from '../../../modules/validate'

import { toggleStep } from '../modules/create'

class SecondStepForm extends React.Component {

  render(){

    const { handleSubmit, pristine, submitting, toggleStep, previous } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field name="codeDesc" component={renderTextArea} label="文字介绍" />
        <Field name="file" component={renderFile} label="组件文件" />
        
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
    initialValues: state.widgetCreate.form2,
  }),

  mapDispatchToProps

)(reduxForm({
  form: 'widgetCreateSecond',   
  fields: [],
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate
})(SecondStepForm))

