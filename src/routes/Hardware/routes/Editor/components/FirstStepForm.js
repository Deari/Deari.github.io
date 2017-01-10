import React, { Component, PropTypes } from 'react'
import { connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import renderField, { renderTextArea, renderSelect, renderTags,
  renderImageUpload, renderCorDropdown }from '../modules/renderField'

import { validate, asyncValidate, repeatCheck }  from '../modules/validate'

import { toggleTag } from '../modules/edit'

import fetchUtil from 'routes/utils/fetchUtil'
import { getDomain } from 'routes/utils/domain'

import './firstStepForm.scss'

class FirstStepForm extends Component {

  render() {
    const { handleSubmit, toggleTag, tags, cates, sdkTypes, osPlatforms, hardwarePlatforms } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="hardwareName" type="text" label="硬件名称" component={renderField} />

        <Field name="hardwareLogo" type="text" label="LOGO" component={renderImageUpload} />

        <Field name="hardwareFunction" label="硬件介绍" component={renderTextArea} />

        <Field name="category" label="分类" component={renderCorDropdown} cates={cates} />

        <Field name="tags" label="产品标签" component={renderTags} tags={tags} />

        <Field name="hardwareMode" type="text" label="硬件型号" component={renderField} />

        <Field name="hardwareProducer" type="text" label="生产厂家" component={renderField} />

        <div className="form-row file-position">
          <label>通讯方式</label>
          <div className="row-right">
            <label><Field name="commType1" component="input" type="checkbox" /> WIFI</label>
            <label><Field name="commType2" component="input" type="checkbox" /> 蓝牙</label>
          </div>
        </div>

        <Field name="sdkType" label="SDK类型" component={renderSelect}>
        <option>请选择SDK类型</option>
          {
            sdkTypes.map((item) => (
              <option value={item.key}>
                {item.value}
              </option>
            ))
          }
        </Field>

        <Field name="os" label="操作平台" component={renderSelect}>
          <option>请选择操作平台</option>
          {
            osPlatforms.map((item) => (
              <option value={item.key}>
                {item.value}
              </option>
            ))
          }
        </Field>

        <Field name="hardwarePlatform" label="硬件平台" component={renderSelect}>
          <option>请选择硬件平台</option>
          {
            hardwarePlatforms.map((item) => (
              <option value={item.key}>
                {item.value}
              </option>
            ))
          }
        </Field>

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

const mapStateToProps = ({ hdEdit}) => ({
  initialValues: hdEdit.form,
  tags: hdEdit.tags,
  cates: hdEdit.cates,
  sdkTypes: hdEdit.sdkTypes,
  osPlatforms: hdEdit.osPlatforms,
  hardwarePlatforms: hdEdit.hardwarePlatforms
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'hdEditStep1',
  fields: [],
  // validate,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true
})(FirstStepForm))



