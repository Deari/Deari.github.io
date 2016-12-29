import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'

import renderField, { renderTextArea } from '../modules/renderField'
import { validate } from '../modules/validate'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'

import { toggleStep, updateAppId, fetchTags, fetchCates,
  toggleTag, updateForm2 } from '../modules/create'

class SecondStepForm extends React.Component {

  fileUpload(e) {
    const url = getDomain("http://api.intra.","ffan.net/bo/v1/web/file/upload")
    const  formData = new FormData()
    formData.append('fileName', e.target.files[0])
    console.log(e.target.files[0].name);

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false

    }).then(res=>{
      console.info(res);

      if(res.status === 200){
        
        this.props.updateForm2(res.data)

      } else{
        console.warn(res);
      }

    }).catch(e=>{
      console.warn(e);
    })
  }

  render(){

    const { handleSubmit, pristine, submitting, toggleStep } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field name="codeDesc" component={renderTextArea} label="文字介绍" />

        <div className="form-row file-position">
        	<label>应用文件</label>
        	<div className="row-right">
        		<span className="file-name"></span>
        		<div className="file-btn">浏览</div>
	          <input type="file" className="form-file" onChange={::this.fileUpload} />
	        </div>
        </div>
        
        <div className="form-btn">
          <div>
            <button type="button" className="previous" onClick={()=>toggleStep(1)}>上一步</button>
            <button type="submit" className="next" disabled={submitting}> 提交</button>
          </div>
        </div>
      </form>
    )
  }

}

const mapDispatchToProps = {
  toggleStep,
  updateForm2,
};

export default connect(
  state=>({
    initialValues: state.create.form2,
  }),

  mapDispatchToProps

)(reduxForm({
  form: 'secondStepForm',   
  fields: ['appName', 'appDesc'],
  // validate,
})(SecondStepForm))