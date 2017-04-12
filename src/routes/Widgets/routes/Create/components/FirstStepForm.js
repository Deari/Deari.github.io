import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import {
  renderField,
  renderTextArea, 
  renderSelect, 
  renderTags,
  renderImageUpload,
  renderSizeRadioBox
} from '../../../modules/renderField'

import { validate, asyncValidate, repeatCheck } from '../../../modules/validate'

import './firstStepForm.scss'

class FirstStepForm extends Component {

  render() {
    const { handleSubmit, tags, cates, initialValues, sizeList } = this.props;
    const imgDoc = '预览图用于商家在装修自己店面时，在操作区域展示的图片';
    const height = 200;
    return (
      <form onSubmit={handleSubmit}>
        <div className="header-title">
          <h2 className="step-tittle">基本信息</h2>
        </div>
        <Field label="组件名称" name="appName" type="text" component={renderField}
               describeId='appName' describeContent="您的 组件 在 组件市场 中显示的名称" />
        <Field label="尺寸" name="size" sizeList={sizeList} component={renderSizeRadioBox} />
        <Field label="预览图" name="appPreviewImage" type="text" component={renderImageUpload} doc={imgDoc} h={height} />
        <Field label="组件图片" name="appLogo" type="text" component={renderImageUpload}
               describeId='appLogo' describeContent="此图标将用于 组件市场，最低分辨率至少为 72 DPI，并采用 RGB 色彩空间。它不能包含图层或圆角。" />
        <Field label="组件简介" name="appDesc" placeholder="请输入组件简介。此内容将显示在组件列表页中。" component={renderTextArea}
               describeId='appDesc' describeContent="对您的 组件 的描述，用以详细说明特性和功能" />
    
        {/**    <Field label="分类" name="categoryId" component={renderSelect}>
          <option value={-1}>请选择分类</option>
          {
            cates.map((item) => (
              <option value={item.categoryId}>
                {item.categoryName}
              </option>
            ))
          }
        </Field> */}
        <Field label="标签" name="tags" component={renderTags} tags={tags}
               describeId='tags' describeContent="一个或多个标签，用以描述您的组件" />
        <div className="form-btn">
          <div>
            <button type="submit" className="next">保存</button>
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
    sizeList: state.widgetCreate.sizeList,
    cates: state.widgetCreate.cates
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'widgetsCreateFirst',
  fields: [],
  //destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(FirstStepForm))

