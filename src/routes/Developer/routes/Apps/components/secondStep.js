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
      const fileRes = await fetch(url, {
        method: "POST",
        body: data
      })
      const file = await fileRes.json();
      if(file.data.status === 200){
        alert(OK)
      }
      const fileObj = file.data;
      console.log(fileObj)
      this.props.getParams(fileObj, fileObj)
    } catch(e){
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


