import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import renderField, {
  renderTextArea, renderSelect, renderTags,
  renderImageUpload,
  renderSizeRadioBox
} from '../modules/renderField'

import { validate, asyncValidate, repeatCheck } from '../modules/validate'

//import fetchUtil from '../../../../utils/fetchUtil'
//import { getDomain } from '../../../../utils/domain'

import './firstStepForm.scss'

class FirstStepForm extends Component {

  render() {
    const { handleSubmit, tags, cates, initialValues, sizeList } = this.props;
    // return null;

    return (
      <form onSubmit={handleSubmit}>
        <Field label="组件名称" name="appName" type="text" component={renderField}/>

        <Field label="尺寸" name="size" sizeList={sizeList} component={renderSizeRadioBox}/>
        
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
  fields: ['appName', 'appDesc'],
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true
  // validate,
})(FirstStepForm))

