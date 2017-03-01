import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'

import { renderField, renderTextArea, renderFile, renderPublishRadioBox, versionTextArea, renderSelect } from '../../../modules/renderField'
import { validate } from '../../../modules/validate'

import { toggleStep } from '../modules/edit'

class SecondStepForm extends React.Component {

  render(){

    const { handleSubmit, submitting, toggleStep, initialValues } = this.props
    const { appKind, versionsList, publishList } = initialValues

    return (
      <form onSubmit={handleSubmit}>
       <div>
          <Field name="codeDesc" placeholder="请输入版本介绍。此内容将显示在应用详情页的版本信息中。" component={versionTextArea} label="版本介绍" />
          <div className="form-row form-rowM">
            <label className="labelH"></label>
            <div className="row-right">
              <div className="row-radio">
                <Field name="showUpdateMsg" id="isShow" component="input" type="checkbox" />
                <span>
                  <i className="iconfont icon-radio1 icon-publish"></i>
                  <i className="iconfont icon-radio icon-publish"></i>
                </span>
              </div>
              <p htmlFor="isShow" className="right-info">发布此版本后，将更新内容显示给商家<span>4000</span></p>
            </div>
          </div>
        </div>
        <Field label="版本号" name="codeVersion" component={renderSelect}>
          <option value={-1}>请选择分类</option>
          {
            versionsList.map((item) => (
              <option value={item.value}>
                {item.value}
              </option>
            ))
          }
        </Field>
        {appKind === 0 && <Field name="file" component={renderFile} label="组件文件(RN)" />}
        {appKind === 1 && <Field name="fileLink" type="text" placeholder="请输入网址" component={renderField} label="组件网址" />}
        <Field label="版本发布" name="autoPublish" publishList={publishList} component={renderPublishRadioBox} />
        <div className="form-btn">
          <div>
            <button type="button" className="previous" onClick={()=>toggleStep(1)}>上一步</button>
            <button type="submit" className="next" disabled={submitting}> 提交</button>
          </div>
        </div>
      </form>
    )
  }

}

const mapDispatchToProps = {
  toggleStep,
};

export default connect(
  state=>({
    initialValues: state.widgetEdit.form2,
  }),

  mapDispatchToProps

)(reduxForm({
  form: 'widgetsEditStep2',   
  fields: [],
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate
})(SecondStepForm))