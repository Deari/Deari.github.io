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
const getimgSrc = (sizeList, size) => {
  let image = ''
  sizeList.map((v) => {
    if (v.value.widgetW === size.w && v.value.widgetH === size.h) {
      image = v.image
    }
  })
  return image
}
class FirstStepForm extends Component {

  render() {
    const { handleSubmit, tags, cates, initialValues, sizeList } = this.props;
    const imgDoc = '预览图用于商家在装修自己店面时，在操作区域展示的图片';
    const height = 200;
    const imgSrc = initialValues.size&&getimgSrc(sizeList,initialValues.size)
    const h = initialValues.size && initialValues.size.h || 0;
    const w = initialValues.size && initialValues.size.w || 0;
    const styleObj = h != 0 && w != 0 ? { height: h * 100 / 4 + 'px', width: w * 100 / 4 + 'px', } : { height: 100 + 'px', width:100 + 'px'}
    const hwString = w  + "*" + h
    return (
      <form onSubmit={handleSubmit}>
        <div className="header-title">
          <a href='1' className="step-tittle active">基本信息</a>
          <a href='2' className="step-tittle">版本信息</a>
        </div>
        <div className='update-msg'>
          <p><i className='iconfont icon-zhuyi'></i>您的这次更新会在新的 组件 版本发布后，在 组件市场 上显示。</p>
        </div>
        <Field required label="组件名称" name="appName" type="text" component={renderField}
               describeId='appName' describeContent="您的 组件 在 组件市场 中显示的名称" />
        <div required className="form-row">
        	<label> <i className='require_field'>*</i>尺寸</label>
        	<div className="row-right">
        		<p>组件在手机屏幕中所占比例的尺寸</p>
        		<div className="row-size show-size">
	        		<span className={`${imgSrc} row-img`}></span>
	          	<span>{hwString}</span>
        		</div>
        	</div>
        </div>
        <Field required label="预览图" name="appPreviewImage" type="text" component={renderImageUpload} doc={imgDoc} h={height} styleObj={styleObj}/>
        <Field required label="组件图片" name="appLogo" type="text" component={renderImageUpload}
               describeId='appLogo' describeContent="此图标将用于 组件市场，最低分辨率至少为 72 DPI，并采用 RGB 色彩空间。它不能包含图层或圆角。" />
        <Field required label="组件简介" name="appDesc" placeholder="请输入组件简介。此内容将显示在组件列表页中。" component={renderTextArea}
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
        <Field required label="标签" name="tags" component={renderTags} tags={tags}
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
    initialValues: state.widgetEdit.form,
    tags: state.widgetEdit.tags,
    sizeList: state.widgetEdit.sizeList,
    cates: state.widgetEdit.cates
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'widgetsEditStep1',
  fields: [],
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate
})(FirstStepForm))

