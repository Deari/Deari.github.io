import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'
  
import renderField, { renderTextArea, renderFile, renderSelect, renderImageUpload, renderImgsUpload } from '../modules/renderField'
import { validate } from '../modules/validate'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'

import { toggleStep, getSdkInfo } from '../modules/create'

class SecondStepForm extends React.Component {

  render(){

    const { handleSubmit, submitting, toggleStep } = this.props

    return (
      <form onSubmit={handleSubmit}>      

        <Field label="硬件图片" name="hardwarePics" type="text" component={renderImgsUpload} />

        <Field name="hardwareBrand" type="text" label="硬件品牌" component={renderField} />

        <Field name="hardwareDetail" label="功能描述" component={renderTextArea} />

        <Field name="hardwareReport" component={renderFile} label="测试报告" />

        <div className="form-btn">
	          <div>
	          	<button type="button" className="previous" onClick={()=>toggleStep(1)}>上一步</button>
              {/*<a target="_blank" className="row-btn"><button type="button" >下载SDK</button></a>*/}
	          	<button type="submit" className="next" disabled={submitting}>提交审核</button>
	          </div>
        </div>
      </form>
    ) 
  }
}



const mapDispatchToProps = {
  toggleStep
};

export default connect(
  state=>({
    initialValues: state.hardwareCreate.form2,
  }),

  mapDispatchToProps

)(reduxForm({
  form: 'secondStepForm',   
  fields: ['appName', 'appDesc'],
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(SecondStepForm))


