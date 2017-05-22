import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'

import {
  renderField,
  renderTextArea,
  renderSelect,
  renderTags,
  renderImageUpload
} from '../../../modules/renderField'

import { validate, asyncValidate, repeatCheck } from '../../../modules/validate'
import ScreenSize from 'business/AppCreate/ScreenSize2'

import './style.scss'

const FirstStepForm = props => {
  const { handleSubmit, tags, cates, initialValues, appKind } = props

  return (
    <form onSubmit={handleSubmit}>
      <div className='edit-header'>
        <a href='1' className='step-tittle active'>基本信息</a>
        <a href='2' className='step-tittle'>版本信息</a>
      </div>
      <div className='update-msg'>
        <p><i className='iconfont icon-zhuyi' />您的这次更新会在新的 应用 版本发布后，在 应用市场 上显示。</p>
      </div>
      <Field required label='应用名称' maxLength={50} name='appName' type='text' component={renderField}
        describeId='appName' describeContent='您的应用在应用市场中显示的名称' />
      { +appKind ===1 && <Field
        required 
        label='适配屏幕' 
        name='screenSize' 
        component={ScreenSize}
      />}
      <Field required label='应用图片' name='appLogo' type='text' component={renderImageUpload}
        describeId='appLogo' describeContent='此图标将用于 应用市场，最低分辨率至少为 72 DPI，并采用 RGB 色彩空间。它不能包含图层或圆角。' />
      <Field required label='应用简介' name='appDesc' placeholder='请输入应用简介。此内容将显示在应用列表页中。' component={renderTextArea}
        describeId='appDesc' describeContent='对您的 应用 的描述，用以详细说明特性和功能' />
      {/**   <Field label="分类" name="categoryId" component={renderSelect}>
        <option value={-1}>请选择分类</option>
        {
          cates.map((item) => (
            <option value={item.categoryId}>
              {item.categoryName}
            </option>
          ))
        }
      </Field> */}
      <Field required label='标签' name='tags' component={renderTags} tags={tags}
        describeId='tags' describeContent='一个或多个标签，用以描述您的应用' />
      <div className='form-btn'>
        <div>
          <button type='submit' className='next'>保存</button>
        </div>
      </div>
    </form>
  )
}

FirstStepForm.propTypes = {
  handleSubmit : PropTypes.func.isRequired
}

const mapDispatchToProps = {
}

const mapStateToProps = ({ appsEdit }) => ({
  initialValues: appsEdit.form,
  tags: appsEdit.tags,
  cates: appsEdit.cates
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'editAppStep1',
  fields: [],
  // destroyOnUnmount: false,
  // forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate
})(FirstStepForm))

