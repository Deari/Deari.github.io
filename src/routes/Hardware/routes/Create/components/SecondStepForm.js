import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField, { renderTextArea, renderSelect } from '../modules/renderField'
import { validate } from '../modules/validate'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'

class SecondStepForm extends React.Component {

  renderUploadImage(){
    const { imageUrl, imageUpload } = this.props;
    let hardwarePics = []
    return <div className="form-row">
      <label>硬件图片</label>
      <div className="row-right">
        <p>请上传硬件真实图片</p>
        <p>要求细节清晰，尺寸不限，最多上传4张，每张大小不超过1M。</p>
        <span>
          <input type="button" value="选择文件" />
          <input type="file" accept=".png" ref='hardwareLogo' onChange={imageUpload} />
        </span>
        <div className="img-container">
          {
            hardwarePics.map( (item, index) => {
              return <img src={item.url} alt="硬件图片"  className="img-thumbnail"/>
            } )
          }
        </div>
      </div>
    </div>
  }

  async fileUpload() {
    const { updateForm } = this.props;
    const  formData = new FormData()
    
    formData.append('fileName', this.refs.appFile.files[0])

    const url = getDomain("http://api.intra.","ffan.net/bo/v1/web/file/upload")
    fetchUtil.postJSON(url, formData, {
      jsonStringify: false
    }).then(res=>{
      console.info(res);
      if(res.status === 200){
        updateForm(res.data)
      } else{
        console.warn(res);
      }
    })
  }

  render(){

    let osPlatforms = []
    let sdkTypes = []
    let hardwarePlatforms = []

    const sdkDowload = getDomain(`http://api.intra.`,`ffan.net/bo/v1/web/hardware/getSdkUrl`)

    const { handleSubmit, pristine, submitting, previousPage } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field name="hardwareMode" type="text" label="硬件型号" component={renderField} />

        { this.renderUploadImage() }

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
              <option value={item.categoryId}>
                {item.categoryName}
              </option>
            ))
          }
        </Field>

        <Field name="os" label="操作平台" component={renderSelect}>
          <option>请选择操作平台</option>
          {
            osPlatforms.map((item) => (
              <option value={item.categoryId}>
                {item.categoryName}
              </option>
            ))
          }
        </Field>

        <Field name="hardwarePlatform" label="硬件平台" component={renderSelect}>
          <option>请选择硬件平台</option>
          {
            hardwarePlatforms.map((item) => (
              <option value={item.categoryId}>
                {item.categoryName}
              </option>
            ))
          }
        </Field>

        <div className="form-row file-position">
        	<label>测试报告</label>
        	<div className="row-right">
        		<span className="file-name"></span>
        		<div className="file-btn">浏览</div>
	          <input type="file" className="form-file" ref='appFile' name='appFile' onChange={this.fileUpload.bind(this)} />
	        </div>
        </div>

        <div className="form-btn">
	          <div>
	          	<button type="button" className="previous" onClick={previousPage}>上一步</button>
              <a href={sdkDowload} target="_blank" className="row-btn"><button type="button" >下载SDK</button></a>
	          	<button type="submit" className="next" disabled={submitting}>提交审核</button>
	          </div>
        </div>
      </form>
    ) 
  }
}

export default reduxForm({
  form: 'secondStepForm', 
  destroyOnUnmount: false,
  enableReinitialize: true
  // validate
})(SecondStepForm)


