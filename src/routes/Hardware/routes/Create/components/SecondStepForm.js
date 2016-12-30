import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'
  
import renderField, { renderTextArea, renderFile, renderSelect, renderImageUpload, renderImgsUpload } from '../modules/renderField'
import { validate } from '../modules/validate'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'

import { toggleStep, fetchSdkInfo } from '../modules/create'

class SecondStepForm extends React.Component {

  async componentDidMount() {
    await this.props.fetchSdkInfo()
  }

  render(){

    const sdkDowload = getDomain(`http://api.intra.`,`ffan.net/bo/v1/web/hardware/getSdkUrl`)

    const { handleSubmit, submitting, toggleStep } = this.props

    const sdkTypes = this.props.sdkTypes || []
    const osPlatforms = this.props.osPlatforms || []
    const hardwarePlatforms = this.props.hardwarePlatforms || []

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

        <Field name="sdkType" label="SDK类型" component={renderSelect}>
          <option>请选择SDK类型</option>
          {
            sdkTypes.map((item) => (
              <option value={item.key}>
                {item.value}
              </option>
            ))
          }
        </Field>

        <Field name="os" label="操作平台" component={renderSelect}>
          <option>请选择操作平台</option>
          {
            osPlatforms.map((item) => (
              <option value={item.key}>
                {item.value}
              </option>
            ))
          }
        </Field>

        <Field name="hardwarePlatform" label="硬件平台" component={renderSelect}>
          <option>请选择硬件平台</option>
          {
            hardwarePlatforms.map((item) => (
              <option value={item.key}>
                {item.value}
              </option>
            ))
          }
        </Field>
        <Field name="hardwareReport" component={renderFile} label="测试报告" />


        <div className="form-btn">
	          <div>
	          	<button type="button" className="previous" onClick={()=>toggleStep(1)}>上一步</button>
              <a href={sdkDowload} target="_blank" className="row-btn"><button type="button" >下载SDK</button></a>
	          	<button type="submit" className="next" disabled={submitting}>提交审核</button>
	          </div>
        </div>
      </form>
    ) 
  }
}



const mapDispatchToProps = {
  toggleStep,
  fetchSdkInfo
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


