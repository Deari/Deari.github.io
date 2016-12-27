import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField, { renderTextArea } from '../modules/renderField'
import { validate } from '../modules/validate'

import { getDomain } from '../../../../utils/domain'

class SecondStepForm extends React.Component {


  render(){
    const { handleSubmit, pristine, submitting, previousPage, fileUpload } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field name="codeDesc" component={renderTextArea} label="文字介绍" />
        <div>
        	<label>应用文件</label>
        	<div className="form-group">
	          <input 
              type="file" 
              className="form-control-file form-control-sm upload-btn" 
              ref='appFile' 
              name='appFile'
              onChange={fileUpload}
            />
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
  form: 'secondStepForm', 
  destroyOnUnmount: false,
  // validate
})(SecondStepForm)


