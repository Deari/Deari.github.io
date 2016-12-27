import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField, { renderTextArea } from '../modules/renderField'
import { validate } from '../modules/validate'

import { getDomain } from '../../../../utils/domain'


class WizardFormSecondPage extends React.Component {
  async fileUpload() {
    let data = new FormData()
    data.append('fileName', this.refs.appFile.files[0])
    const url = getDomain(
      "http://api.intra.",
      "ffan.net/bo/v1/web/file/upload"
    )
    try {    
      const fileRes =  await fetchUtil.postJSON(url,data,{"type":"formData"});
      const fileObj = fileRes.data;
      if(fileObj.status === 200){
         this.props.getParams(fileObj, fileObj)
      }else{
        alert('服务端验证不通过，请进一步核对信息')
      }
    } catch(e){
      alert(e.msg)
      console.log(e)
    }
  }

  render(){
    const { handleSubmit, pristine, submitting, previousPage } = this.props
    return (
      <form onSubmit={handleSubmit} className="step_form">
        <Field name="codeDesc" component={renderTextArea} label="文字介绍" />
        <div className="step_form_row">
        	<label className="step_form_row_label">应用文件</label>
        	<div className="step_form_row_right step_form_row_right_browse">
        		<input type="text" className="step_form_row_right_inputName"/>
        		<input type="button" value="浏览" className="step_form_row_right_inputB"/>
	          <input type="file" className="step_form_row_right_inputF" ref='appFile' name='appFile' onChange={this.fileUpload.bind(this)} />
	        </div>
        </div>
        <div className="step_form_btn">
	          <button type="button" className="previous" onClick={previousPage}>上一步</button>
	          <button type="submit" className="next" disabled={pristine || submitting}> 提交</button>
        </div>
      </form>
    ) 
  }

}

export default reduxForm({
  form: 'wizard',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
  validate
})(WizardFormSecondPage)


