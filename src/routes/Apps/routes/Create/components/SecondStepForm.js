import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField, { renderTextArea } from '../modules/renderField'
import { validate } from '../modules/validate'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'

class SecondStepForm extends React.Component {

  render(){

    const { handleSubmit, pristine, submitting, previousPage,
      fileUpload } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field name="codeDesc" component={renderTextArea} label="文字介绍" />
        <div className="form-row file-position">
        	<label>应用文件</label>
        	<div className="row-right">
        		<span className="file-name"></span>
        		<div className="file-btn">浏览</div>
	          <input type="file" className="form-file" ref='appFile' name='appFile' onChange={fileUpload} />
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
  enableReinitialize: true
  // validate
})(SecondStepForm)


