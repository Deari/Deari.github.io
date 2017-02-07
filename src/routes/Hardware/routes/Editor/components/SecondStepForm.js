import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'
  
import { 
  renderField,
  renderTextArea, 
  renderFile, 
  renderImageUpload, 
  renderImgsUpload 
} from '../../../modules/renderField'
import { validate } from '../../../modules/validate'

import { getDomain } from 'utils/domain'
import fetchUtil from 'utils/fetchUtil'

import { toggleStep } from '../modules/edit'

class SecondStepForm extends React.Component {

  render(){

    const { handleSubmit, submitting, toggleStep } = this.props

    return (
      <form onSubmit={handleSubmit}>      
        <Field name="hardwarePics" type="text" label="硬件图片"  component={renderImgsUpload} />

        <Field name="hardwareBrand" type="text" label="硬件品牌" component={renderField} />

        <Field name="hardwareDetail" label="功能描述" component={renderTextArea} />

        <Field name="hardwareReport" label="测试报告" component={renderFile} />

        <div className="form-btn">
	          <div>
	          	<button type="button" className="previous" onClick={()=>toggleStep(1)}>上一步</button>
	          	<button type="submit" className="next" disabled={submitting}>提交审核</button>
	          </div>
        </div>
      </form>
    ) 
  }
}



const mapDispatchToProps = {
  toggleStep
}

const mapStateToProps = ({ hdEdit }) => ({
  initialValues: hdEdit.form2
})
export default connect(
  mapStateToProps,
  mapDispatchToProps

)(reduxForm({
  form: 'hdEditStep2',   
  fields: [],
  // forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate
})(SecondStepForm))


