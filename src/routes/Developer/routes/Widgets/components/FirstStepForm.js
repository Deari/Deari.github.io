import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import renderField, { renderTextArea, renderSelect}from '../modules/renderField'
import { validate, asyncValidate, repeatCheck }  from '../modules/validate'

// import Tags from '../../../../../components/Tags'

import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from '../../../../utils/domain'

import './firstStepForm.scss'
import RenderUploadImage from './Uploadimage'


class FirstStepForm extends Component {
  render() {
    const { handleSubmit, toggleTag, tags, cates, initialValues } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field label="应用名称" name="appName" type="text" 
          component={renderField}
        />
        <RenderUploadImage/>
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
        
        <div className="form-row">
          <label>产品标签</label>
          <ul className="row-right max-width">
            {
              tags.map((item) => (
                <li 
                  className={
                    ((tagId)=>{
                      return initialValues.tags.indexOf(tagId) > -1 ? 'active' : ''
                    })(item.tagId)
                  }
                  key={item.tagId}
                  onClick={()=>toggleTag(item.tagId)}
                >{item.tagName}</li>
              ))
            }
          </ul>
        </div>
        
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

export default reduxForm({
  form: 'firstStepForm',   
  fields: ['appName', 'appDesc'],
  destroyOnUnmount: false,     
  // validate,
  enableReinitialize: true
})(FirstStepForm)


