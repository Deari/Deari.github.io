import React, { Component, PropTypes } from 'react'
import { connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import renderField, { renderTextArea, renderSelect, renderTags,
  renderImageUpload }from '../modules/renderField'
import { validate, asyncValidate, repeatCheck }  from '../modules/validate'

import { toggleStep, updateAppId, fetchTags, fetchCates,
  toggleTag, updateForm2 } from '../modules/create'

import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from '../../../../utils/domain'

import './firstStepForm.scss'

class FirstStepForm extends Component {
  
  render() {
    const { handleSubmit, toggleTag, tags, cates, initialValues } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field label="应用名称" name="appName" type="text" 
          component={renderField}/>

        <Field label="应用图片" name="appLogo" type="text" 
          component={renderImageUpload}/>
       
        <Field label="应用简介" name="appDesc" component={renderTextArea} />

        <Field label="分类" name="categoryId" component={renderSelect}>
          <option>请选择分类</option>
          {
            cates.map((item) => (
              <option value={item.categoryId}>
                {item.categoryName}
              </option>
            ))
          }
        </Field>
        
        <Field label="产品标签" name="tags"
          component={renderTags} tags={tags}
        />

        <div className="form-btn">
          <div>
          	<button type="submit" className="next">下一步</button>
          </div>
        </div>
      </form>
    )
  }
}

FirstStepForm.propTypes = {
  handleSubmit : PropTypes.func.isRequired,
}


const mapDispatchToProps = {
  toggleTag,
}

export default connect(
  state=>({
    initialValues: state.create.form,
    tags: state.create.tags,
    cates: state.create.cates
  }),

  mapDispatchToProps

)(reduxForm({
  form: 'firstStepForm',
  fields: ['appName', 'appDesc'],
  // validate,
})(FirstStepForm))



