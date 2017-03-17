import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'

import { 
  renderField, 
  renderTextArea, 
  renderFile, 
  renderCodeVersion,
  renderPublishRadioBox, 
  versionTextArea, 
  renderSelect, 
  showUpdateMsg 
} from '../../../modules/renderField'

import { validate } from '../../../modules/validate'

import { 
  toggleStep, 
  updateCodeDesc, 
  updateConfigArr,
  updateconfigId,
  updateconfigLabel,
  updateconfigValue,
  updateconfigDesc,
  updateconfigType,
  updateConfigAudioArr,
  updateConfigAudioValue,
  updateConfigAudioKey
} from '../modules/edit'

import ConfigTpl from '../../../components/WidgetConfig'

class SecondStepForm extends React.Component {

  state = {
    totalCount: 4000,
  }

  onChangeDesc(e) {
    const { totalCount } = this.state
    let value = e.target.value
    let len = value.length
    if (len > totalCount) return
    let isErr = (len == 0) ? true : false
    this.props.updateCodeDesc({codeDescCount: len, codeDesc: value, isDescErr: isErr})
  }

  render(){

    const { handleSubmit, submitting, toggleStep, initialValues } = this.props
    const { appKind, versionsList, publishList, codeDescCount, isDescErr,configList} = initialValues
    const { totalCount } = this.state

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-row code-desc">
            <label>版本介绍</label>
            <div className="row-right">
              <p><i className="iconfont icon-miashu"></i>描述此版本的新增内容，例如增添了何种新功能，有何改进之处以及修正了哪些错误。</p>
              <textarea maxLength={totalCount} placeholder="请输入版本介绍。此内容将显示在组件详情页的版本信息中。" onChange={this.onChangeDesc.bind(this)} onBlur={this.onChangeDesc.bind(this)} ></textarea>
              { isDescErr && <span><i className="message">请输入版本介绍</i></span> }
            </div>
            <span className="font-count">{codeDescCount} / {totalCount}</span>
          </div>
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
              <label htmlFor="isShow" className="right-info">发布此版本后，将更新内容显示给商家</label>
            </div>
          </div>
        </div>
        <Field label="版本号" name="codeVersion" component={renderCodeVersion} versionsList={versionsList} />
        {appKind === 0 && <Field name="file" component={renderFile} label="组件文件(RN)" />}
        {appKind === 0 && <ConfigTpl 
          configList={configList} 
          updateConfigArr={this.props.updateConfigArr}
          updateconfigId={this.props.updateconfigId}
          updateconfigLabel={this.props.updateconfigLabel}
          updateconfigValue={this.props.updateconfigValue}
          updateconfigDesc={this.props.updateconfigDesc}
          updateconfigType={this.props.updateconfigType}
          updateConfigAudioArr={this.props.updateConfigAudioArr}
          updateConfigAudioValue={this.props.updateConfigAudioValue}
          updateConfigAudioKey={this.props.updateConfigAudioKey}
          />}
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
  updateCodeDesc,
  updateConfigArr,
  updateconfigId,
  updateconfigLabel,
  updateconfigValue,
  updateconfigDesc,
  updateconfigType,
  updateConfigAudioArr,
  updateConfigAudioValue,
  updateConfigAudioKey
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