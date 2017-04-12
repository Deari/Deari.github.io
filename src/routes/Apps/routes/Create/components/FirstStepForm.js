import React, { Component, PropTypes } from 'react'
import { connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { 
  renderField, 
  renderTextArea, 
  renderSelect, 
  renderTags,
  renderImageUpload 
} from '../../../modules/renderField'

import { validate, asyncValidate, repeatCheck }  from '../../../modules/validate'

import './style.scss'

const FirstStepForm = props => {
  const { handleSubmit, tags, cates } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="header-title">
        <h2 className="step-tittle">基本信息</h2>
      </div>
      <Field label="应用名称" name="appName" type="text" component={renderField} 
             describeId='appName' describeContent="您的 应用 在 应用市场 中显示的名称" />
      <Field label="应用图片" name="appLogo" type="text" component={renderImageUpload}
             describeId='appLogo' describeContent="此图标将用于 应用市场，最低分辨率至少为 72 DPI，并采用 RGB 色彩空间。它不能包含图层或圆角。" />
      <Field label="应用简介" name="appDesc" placeholder="请输入应用简介。此内容将显示在应用列表页中。" component={renderTextArea} 
             describeId='appDesc' describeContent="对您的 应用 的描述，用以详细说明特性和功能" />
      {/** <Field label="分类" name="categoryId" component={renderSelect}>
        <option value={-1}>请选择分类</option>
        {
          cates.map((item) => (
            <option value={item.categoryId}>
              {item.categoryName}
            </option>
          ))
        }
      </Field>*/}
      <Field label="标签" name="tags" component={renderTags} tags={tags} 
             describeId='tags' describeContent="一个或多个标签，用以描述您的应用" />
      <div className="form-btn">
        <div>
          <button type="submit" className="next">保存</button>
        </div>
      </div>
    </form>
  )
}

FirstStepForm.propTypes = {
  handleSubmit : PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  
}

const mapStateToProps = ({ appsCreate }) => ({
  initialValues: appsCreate.form,
  tags: appsCreate.tags,
  cates: appsCreate.cates
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'createAppStep1',
  fields: [],
  //destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(FirstStepForm))



