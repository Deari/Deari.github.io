import React from 'react'
import { connect} from 'react-redux'
import { IndexLink, Link } from 'react-router' 
import { Field, reduxForm } from 'redux-form'

import { renderField, versionTextArea, renderFile ,renderSelect, renderPublishRadioBox } from '../../../modules/renderField'

import { validate } from '../../../modules/validate'

const SecondStepForm = props => {

  const { handleSubmit, submitting, previous, initialValues } = props
  const {isH5App,publishList,versionsList} = initialValues

  return (
    <form onSubmit={handleSubmit}>
    
      <div>
        <Field name="codeDesc" placeholder="请输入版本介绍。此内容将显示在应用详情页的版本信息中。" component={versionTextArea} label="版本介绍" />
        <Field name="isShow" id="isShow" component="input" type="checkbox" />
        <label htmlFor="isShow">发布此版本后，将更新内容显示给商家<span>4000</span></label>
      </div>
      <Field label="版本号" name="versionNum" component={renderSelect}>
        <option value={-1}>请选择分类</option>
        {
          versionsList.map((item) => (
            <option value={item.value}>
              {item.value}
            </option>
          ))
        }
      </Field>
      {isH5App === 0 && <Field name="file" component={renderFile} label="应用文件" />}
      {isH5App === 1 && <Field name="fileLink" type="text" placeholder="请输入网址" component={renderField} label="应用网址" />}
      <Field label="版本发布" name="publish" publishList={publishList} component={renderPublishRadioBox} />
     

      <div className="form-btn">
        <div>
          <button type="button" className="previous" onClick={previous}>上一步</button>
          <button type="submit" className="next" disabled={submitting}> 提交</button>
        </div>
      </div>
    </form>
  )
}

const mapDispatchToProps = {

}

const mapStateToProps = ({appsCreate}) => ({
  initialValues: appsCreate.form2,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps

)(reduxForm({
  form: 'createAppStep2',
  fields: [],
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate
})(SecondStepForm))