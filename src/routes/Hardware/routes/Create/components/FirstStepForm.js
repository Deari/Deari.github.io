import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import renderField, { renderTextArea, renderSelect}from '../modules/renderField'
import { validate, asyncValidate, repeatCheck }  from '../modules/validate'

// import Tags from '../../../../../components/Tags'

import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from '../../../../utils/domain'

import './firstStepForm.scss'

class FirstStepForm extends Component {
  
  renderUploadImage(){
    const { imageUrl, imageUpload } = this.props;

    return <div className="form-row">
      <label>LOGO</label>
      <div className="row-right">
        <p>请上传硬件高清图片</p>
        <p>400*400像素，仅支持PNG格式，大小不超过300KB</p>
        <span>
          <input type="button" value="选择文件" />
          <input type="file" accept=".png" ref='hardwareLogo' onChange={imageUpload} />
        </span>
        <div className="img-container">
          <img src={imageUrl} alt="上传图片" className="img-thumbnail" />
        </div>
      </div>
    </div>
  }

  render() {
    const { handleSubmit, toggleTag, tags, cates, initialValues } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field label="硬件名称" name="hardwareName" type="text" 
          component={renderField}
        />

        {this.renderUploadImage()}
       
        <Field label="硬件介绍" name="hardwareFunction" component={renderTextArea} />

        <div className="form-row">
          <label>分类</label>
          <div className="row-right">
            <select name="majorCategoryId" ref="majorCategoryId" className="row-select" >
              <option>请选择分类</option>
              {
                cates.map( (item, index) => (
                  <option key={item.categoryId} value={item.categoryId}>{item.categoryName}</option>
                ))
              }
            </select>
            <Field name="minorCategoryId" component="select">
		          <option>请选择分类</option>
		          {
		            cates.map((item) => (
		              <option value={item.categoryId}>
		                {item.categoryName}
		              </option>
		            ))
		          }
		        </Field>
          </div>
        </div>

        
        
        <div className="form-row">
          <label>标签</label>
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
          	<button type="submit" className="next">保存并下一步</button>
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


