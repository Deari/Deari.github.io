import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import renderField, {
  renderTextArea, renderSelect, renderTags,
  renderImageUpload
} from '../modules/renderField'

import { validate, asyncValidate, repeatCheck } from '../modules/validate'

import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from '../../../../utils/domain'

import './firstStepForm.scss'

class FirstStepForm extends Component {

  render() {
    const { handleSubmit, tags, cates, initialValues } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field label="组件名称" name="appName" type="text"
          component={renderField}
          />
        <div className="form-row">
          <label>尺寸</label>
          <div className="row-right">
            <p>请选择组件在手机屏幕中所占比例的尺寸</p>
            <div className="row-size">
             <label >
              <span className="row-img img1"></span>
              <span className="row-radio">
                <i className="iconfont icon-radio1"></i>
                <i className="iconfont icon-radio active"></i>
                <input type="radio" className="row-inputR" name="size" value="2X1" onChange={this.select}/>
              </span>
             </label>
            </div>
            <div className="row-size">
             <label>
              <span className="row-img img2"></span>
              <span className="row-radio">
                <i className="iconfont icon-radio1"></i>
                <i className="iconfont icon-radio"></i>
                <input type="radio" className="row-inputR"  name="size" value="1X1" onChange={this.select} />
              </span>
             </label>
            </div>
            <div className="row-size">
            <label>
              <span className="row-img img3"></span>
              <span className="row-radio">
                <i className="iconfont icon-radio1"></i>
                <i className="iconfont icon-radio"></i>
                <input type="radio" className="row-inputR"  name="size" value="2X2" onChange={this.select}/>
              </span>
              </label>
            </div>
            <div className="row-size">
              <label>
                <span className="row-img img4"></span>
                <span className="row-radio">
                  <i className="iconfont icon-radio1"></i>
                  <i className="iconfont icon-radio"></i>
                  <input type="radio" className="row-inputR" name="size" value="2X2" />
                </span>
              </label>
            </div>
          </div>
        </div>

        <Field label="组件LOGO" name="appLogo" type="text" 
          component={renderImageUpload}/>

        <Field label="组件缩略图" name="appPreviewImage" type="text" 
          component={renderImageUpload}/>

        <Field label="组件简介" name="appDesc" component={renderTextArea} />

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
  handleSubmit: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  
}

const mapStateToProps = (state)=> {
  return {
    initialValues: state.widgetCreate.form,
    tags: state.widgetCreate.tags,
    cates: state.widgetCreate.cates
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'widgetsCreateFirst',
  fields: ['appName', 'appDesc'],
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate,
})(FirstStepForm))

