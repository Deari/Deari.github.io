import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField, { renderTextArea } from '../modules/renderField'
import { validate } from '../modules/validate'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'
import RenderUploadImage from './UploadImg'

class SecondStepForm extends React.Component {

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

    const { handleSubmit, pristine, submitting, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field name="codeDesc" component={renderTextArea} label="文字介绍" />
        <RenderUploadImage/>
        <div className="form-row file-position">
        	<label>应用文件</label>
        	<div className="row-right">
        		<span className="file-name"></span>
        		<div className="file-btn">浏览</div>
	          <input type="file" className="form-file" ref='appFile' name='appFile' onChange={this.fileUpload.bind(this)} />
	        </div>
        </div>
        <div className="form-btn">
	          <div>
	          	<button type="button" className="previous" onClick={previousPage}>上一步</button>
	          	<button type="submit" className="next" disabled={submitting}> 提交</button>
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


