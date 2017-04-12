import React from 'react'
import { connect} from 'react-redux'

import { Field, reduxForm } from 'redux-form'

import { renderField, renderTextArea, renderFile, renderPublishRadioBox, versionTextArea, renderSelect, renderCodeVersion } from '../../../modules/renderField'
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
  updateConfigAudioKey,
  toggleCodeVersion,
  toggleActive,
  toggleLogoList,
  toggleIdList,
  WtoggleIdList, 
  WtoggleLogoList,
  toggleNameList, 
  WtoggleNameList,
 } from '../modules/create'

import ConfigTpl from '../../../components/WidgetConfig'
import AssociationModule from '../../../components/Association.js'
import Modal from 'components/Modal'
import ModalList from '../../../components/ModalList'
import VersionCordModule from '../../../components/VersionCord'

const compose = (arr1, arr2, arr3) => {
  const newArray = []
  if(Array.isArray(arr1) && arr1.length !==0){
    for (let i = 0; i < arr1.length; i++) {
      const obj = {};
      obj.id = arr1[i]
      obj.logo = arr2[i]
      obj.name = arr3[i]
      newArray.push(obj)
    }
  }
  return newArray
}

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

    const { handleSubmit, pristine, submitting, toggleStep, previous, initialValues } = this.props
    const { 
      versionsList, appKind, publishList, codeDescCount, isDescErr, configList,
      appId,
      appKey,
      appName,
      appLogo,
      active,
      idList,
      logoList,
      wIdList,
      wLogoList,
      nameList,
      wNameList,
      datalist
    } = initialValues

    const { totalCount } = this.state
    const appObj = compose(idList,logoList,nameList)
    const weiObj = compose(wIdList,wLogoList,wNameList)
    const appActive = appObj&&appObj.length!=0 ? 1:0;
    const widgetActive = weiObj&&weiObj.length!=0 ? 1:0;
    const handleLogochange = (data,type)=>{
      type = type ? type : active.type
      type === "app" ? this.props.toggleLogoList(data) : this.props.WtoggleLogoList(data)
    } 
    const handleIdchange = (data,type) =>{
      type = type ? type : active.type
      type === "app" ? this.props.toggleIdList( data ) : this.props.WtoggleIdList( data )
    }
    const handleNamechange = (data,type) =>{
      type = type ? type : active.type
      type === "app" ? this.props.toggleNameList( data ) : this.props.WtoggleNameList( data )
    }
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-row show-contain">
          <img src={appLogo} />
          <div className="show-text">
            <h3>{appName}</h3>
            <p><i>WidgetID：</i><span>{appId}</span></p>
            <p><i>WidgetKey：</i><span>{appKey}</span></p>
          </div>
        </div>
        <div>
          <div className="form-row code-desc">
            <label>版本介绍</label>
            <div className="row-right">
              <p><i className="iconfont icon-miashu"></i>描述此版本的新增内容，例如增添了何种新功能，有何改进之处以及修正了哪些错误。</p>
              <textarea maxLength={totalCount} placeholder="请输入版本介绍。此内容将显示在组件详情页的版本信息中。" onChange={this.onChangeDesc.bind(this)} onBlur={this.onChangeDesc.bind(this)} ></textarea>
              { isDescErr && <span><i className="message-info">请输入版本介绍</i></span> }
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
        {/**<Field label="版本号" name="codeVersion" component={renderCodeVersion} versionsList={versionsList} />*/}
        <VersionCordModule toggleCodeVersion ={this.props.toggleCodeVersion}/>
        {appKind === 0 && <Field name="file" component={renderFile} label="组件文件" genre='(FAP小程序)'/>}
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
         <AssociationModule 
           appObj={appObj} 
           weiObj={weiObj} 
           handleLogochange={handleLogochange} 
           handleIdchange={handleIdchange} 
           handleNamechange={handleNamechange}
           toggleActive={this.props.toggleActive}
         />
         <Modal 
          type={"alert"}
          text={active.type==="app"?"应用":active.type==="widget"?"组件":"硬件"}
          active={active.trim}
          hideButtons={true}
          title={true}
          onClose={()=> this.props.toggleActive({trim:0,type:""})}
         >
         <ModalList  
              name={active.type+"IdList"} 
              component={ModalList} 
              datalist={datalist} 
              idList={active.type==='app'?idList:wIdList} 
              type={active.type} 
              handleLogochange={handleLogochange} 
              handleIdchange={handleIdchange}
              handleNamechange={handleNamechange}
              appId={appId}
          />
        </Modal>
        <div className="form-btn">
          <div>
            <button type="button" className="previous" onClick={()=>{window.scrollTo(0,0);previous()}}>上一步</button>
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
  updateConfigAudioKey,
  toggleCodeVersion,
  toggleActive,
  toggleLogoList,
  toggleIdList,
  WtoggleIdList, 
  WtoggleLogoList,
  toggleNameList, 
  WtoggleNameList,
};

export default connect(
  state=>({
    initialValues: state.widgetCreate.form2,
  }),

  mapDispatchToProps

)(reduxForm({
  form: 'widgetCreateSecond',   
  fields: [],
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate
})(SecondStepForm))

