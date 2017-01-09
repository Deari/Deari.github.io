import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'
  
import renderField, { renderTextArea, renderFile, renderSelect, renderImageUpload, renderImgsUpload } from '../modules/renderField'
import { validate } from '../modules/validate'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'

import { toggleStep, getSdkInfo } from '../modules/create'

class SecondStepForm extends React.Component {

  async componentDidMount() {
    await this.props.getSdkInfo()
  }

  render(){

    const { handleSubmit, submitting, toggleStep } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field name="hardwareMode" type="text" label="硬件型号" component={renderField} />

        <Field label="硬件图片" name="hardwarePics" type="text" component={renderImgsUpload} />

        <Field name="hardwareBrand" type="text" label="硬件品牌" component={renderField} />

        <Field name="hardwareProducer" type="text" label="生产厂家" component={renderField} />

        <div className="form-row file-position">
          <label>通讯方式</label>
          <div className="row-right">
            <label><Field name="commType1" component="input" type="checkbox" /> WIFI</label>
            <label><Field name="commType2" component="input" type="checkbox" /> 蓝牙</label>
          </div>
        </div>

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
  toggleStep,
  getSdkInfo
};

export default connect(
  state=>({
    initialValues: state.hardwareCreate.form2,
    sdkTypes: state.hardwareCreate.sdkTypes,
    osPlatforms: state.hardwareCreate.osPlatforms,
    hardwarePlatforms: state.hardwareCreate.hardwarePlatforms
  }),

  mapDispatchToProps

)(reduxForm({
  form: 'secondStepForm',   
  fields: ['appName', 'appDesc'],
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(SecondStepForm))


