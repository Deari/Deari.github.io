import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'

import { renderField, renderTextArea, renderFile } from '../../../modules/renderField'
import { validate } from '../../../modules/validate'

import { toggleStep } from '../modules/create'

class SecondStepForm extends React.Component {

  render(){

    const { handleSubmit, pristine, submitting, toggleStep, previous, initialValues } = this.props
    const isH5App = initialValues.isH5App

    return (
      <form onSubmit={handleSubmit}>
        <Field name="codeDesc" placeholder="请输入版本介绍。此内容将显示在组件详情页的版本信息中。" component={renderTextArea} label="版本介绍" />
        {isH5App === 0 && <Field name="file" component={renderFile} label="组件文件" />}
        {isH5App === 1 && <Field name="fileLink" type="text" placeholder="请输入网址" component={renderField} label="组件网址" />}
       
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

