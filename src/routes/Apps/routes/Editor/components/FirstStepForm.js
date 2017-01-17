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
  const { handleSubmit, tags, cates, initialValues } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field label="应用名称" name="appName" type="text" component={renderField}/>
      <Field label="应用图片" name="appLogo" type="text" component={renderImageUpload}/>
      <Field label="应用简介" name="appDesc" component={renderTextArea} />
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

      <Field label="标签" name="tags" component={renderTags} tags={tags} />
      <div className="form-btn">
        <div>
          <button type="submit" className="next">下一步</button>
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
  destroyOnUnmount: false,
  // forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(FirstStepForm))



