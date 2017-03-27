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
    const hwString = '【' +'尺寸'+w  + "*" +h +'】'
    return (
      <form onSubmit={handleSubmit}>
        <Field label="组件名称" name="appName" type="text" component={renderField}/>
        <div className="form-row show-size">
          <span className={`${imgSrc} row-img`}></span>
          <span>{hwString}</span>
        </div>
        <Field label="预览图" name="appPreviewImage" type="text" component={renderImageUpload} doc={imgDoc} h={height}/>
        <Field label="组件图片" name="appLogo" type="text" component={renderImageUpload} />
        <Field label="组件简介" name="appDesc" placeholder="请输入组件简介。此内容将显示在组件列表页中。" component={renderTextArea} />
        <Field label="分类" name="categoryId" component={renderSelect}>
          <option value={-1}>请选择分类</option>
          {
            cates.map((item) => (
              <option value={item.categoryId}>
                {item.categoryName}
              </option>
            ))
          }
        </Field>

        <Field label="标签" name="tags"
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

