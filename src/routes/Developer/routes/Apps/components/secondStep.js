import React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderField, { renderTextArea } from './renderField'
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
      <form onSubmit={handleSubmit}>
        <Field name="codeDesc" component={renderTextArea} label="文字介绍" />
        <div>
        	<label>应用文件</label>
        	<div className="form-group">
	          <input type="file" className="form-control-file form-control-sm upload-btn" ref='appFile' name='appFile' onChange={this.fileUpload.bind(this)} />
	        </div>
        </div>
        <div className="btn_submit btn_submit_two">
        	<div>
	          <button type="button" className="previous" onClick={previousPage}>上一步</button>
	          <button type="submit" className="next" disabled={pristine || submitting}> 提交</button>
        	</div>
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


