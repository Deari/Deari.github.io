import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField, { renderTextArea } from '../modules/renderField'
import { validate } from '../modules/validate'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'


class WizardFormSecondPage extends React.Component {
  state = {
    fileUrl: ''
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

    const { handleSubmit, pristine, submitting, previousPage } = this.props

    return (
      <form onSubmit={handleSubmit} className="step_form">
        <Field name="codeDesc" component={renderTextArea} label="文字介绍" />
        <div className="form_row">
        	<label className="step_form_row_label">应用文件</label>
        	<div className="step_form_row_right step_form_row_right_browse">
	          <input type="file" className="step_form_row_right_inputF" ref='appFile' name='appFile' onChange={this.fileUpload.bind(this)} />
	        </div>
        </div>
        <div className="step_form_btn">
	          <button type="button" className="previous" onClick={previousPage}>上一步</button>
	          <button type="submit" className="next" disabled={ submitting}> 提交</button>
        </div>
      </form>
    ) 
  }

}

export default reduxForm({
  form: 'wizard',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
  // validate,
    enableReinitialize: true

})(WizardFormSecondPage)


