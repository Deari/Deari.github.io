import React, { Component, PropTypes } from 'react'
import { connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import renderField, { renderTextArea, renderSelect, renderTags,
  renderImageUpload, renderCorDropdown }from '../modules/renderField'

import { validate, asyncValidate, repeatCheck }  from '../modules/validate'

import { toggleTag } from '../modules/create'

import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from '../../../../utils/domain'

import './firstStepForm.scss'

class FirstStepForm extends Component {

  render() {
    const { handleSubmit, toggleTag, tags, cates, initialValues } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field label="硬件名称" name="hardwareName" type="text" component={renderField} />

        <Field label="LOGO" name="hardwareLogo" type="text" component={renderImageUpload} />

        <Field label="硬件介绍" name="hardwareFunction" component={renderTextArea} />

        <Field label="分类" name="category" component={renderCorDropdown} cates={cates} />

        <Field label="产品标签" name="tags" component={renderTags} tags={tags} />

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

const mapDispatchToProps = {
  toggleTag,
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.hardwareCreate.form,
    tags: state.hardwareCreate.tags,
    cates: state.hardwareCreate.cates
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'firstStepForm',
  fields: ['appName', 'appDesc'],
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(FirstStepForm))



