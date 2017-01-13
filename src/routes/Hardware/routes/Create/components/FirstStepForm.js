import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import renderField, { renderTextArea, renderSelect, renderTags,
  renderImageUpload, renderCorDropdown }from '../modules/renderField'

import { validate, repeatCheck }  from '../modules/validate'

import { toggleTag } from '../modules/create'

import fetchUtil from 'routes/utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'routes/utils/debug'

import './firstStepForm.scss'

class FirstStepForm extends Component {

  render() {
    const { handleSubmit, downLoadSDK, tags, cates, initialValues , sdkTypes, osPlatforms, hardwarePlatforms} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="hardwareName" type="text" label="硬件名称" component={renderField} />

        <Field name="hardwareLogo" type="text" label="LOGO" component={renderImageUpload} />

        <Field name="hardwareFunction" label="硬件介绍" component={renderTextArea} />

        <Field name="category" label="分类" component={renderCorDropdown} cates={cates} />

        <Field name="tags" label="标签" component={renderTags} tags={tags} />

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

        <div className="form-row">
          <label className="labelH"></label>
          <div className="row-right">
            <span className="downLoad" onClick={downLoadSDK}><i className="iconfont icon-downloadbtn"></i>下载SDK</span>
            <Link to="/hardware/doc" className="floatL"><span className="downLoad"><i className="iconfont icon-debug"></i>进入调试</span></Link>
          </div>
        </div>

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

const isValid = (formValues) => {
  const postParams = {}
  const arrPostParams = []

  postParams.hardwareName = formValues.hardwareName.trim() ? formValues.hardwareName : null
  postParams.hardwareMode = formValues.hardwareMode.trim() ? formValues.hardwareMode: null
  postParams.hardwareProducer = formValues.hardwareProducer.trim() ? formValues.hardwareProducer : null
  postParams.sdkType = parseInt(formValues.sdkType)
  postParams.os = parseInt(formValues.os)
  postParams.hardwarePlatform = parseInt(formValues.hardwarePlatform)

  postParams.majorCategoryId = formValues.category && parseInt(formValues.category.majorCategoryId)
  postParams.minorCategoryId = formValues.category && parseInt(formValues.category.minorCategoryId)

  postParams.commType1 = formValues.commType1 ? 1 : 0 
  postParams.commType2 = formValues.commType2 ? 1 : 0 

  for (let key in postParams) {
    arrPostParams.push(postParams[key])
  }

  const allHasValue = arrPostParams.every((item, index) => {
    return (item && item != -1) || item == 0
  })

  const formData = new FormData();
  for(let key in postParams) {
    formData.append(key, postParams[key]);
  }

  return {
    allHasValue: allHasValue,
    postParams: formData
  }
  
}

const getDownLoadSDKUrl = async (postParams) => {
  const url = getDomain("web/hardware/getSdkUrl")
  try {
    let res = await fetchUtil.postJSON(url, postParams, { jsonStringify: false})
    if (res && res.status == 200) {
      return res.data && res.data.sdkUrl
    } else {
      debug.warn('获取下载SDK接口报错', res)
    }
  } catch (e) {
    debug.warn('网络错误', e)
  }
}

const mapStateToProps = (state) => {
  return {
    downLoadSDK: async () => {
      // 这个写法可能不太严谨和规范
      const formValues = state.form.firstStepForm.values
      const result = isValid(formValues)

      if (result && result.allHasValue) {
        const dowloadUrl = result.postParams && await getDownLoadSDKUrl(result.postParams)
        document.location.href = dowloadUrl && dowloadUrl
      } else {
        window.alert("参数不全")
      }
    },
    initialValues: state.hardwareCreate.form,
    tags: state.hardwareCreate.tags,
    cates: state.hardwareCreate.cates,
    sdkTypes: state.hardwareCreate.sdkTypes,
    osPlatforms: state.hardwareCreate.osPlatforms,
    hardwarePlatforms: state.hardwareCreate.hardwarePlatforms
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