import React from 'react'
import { connect} from 'react-redux'
import { IndexLink, Link } from 'react-router' 
import { Field, reduxForm } from 'redux-form'

import Modal from 'components/Modal'
import AssociationModule from '../../../components/Association.js'
import ModalList from '../../../components/ModalList'
import VersionCordModule from '../../../components/VersionCord'

import { renderField, renderFile, renderSelect, renderCodeVersion, renderPublishRadioBox, renderAPKFile } from '../../../modules/renderField'
import { 
  toggleActive, 
  toggleLogoList, 
  toggleIdList, 
  WtoggleIdList,
  WtoggleLogoList, 
  toggleNameList, 
  WtoggleNameList, 
  updateCodeDesc,
  toggleCodeVersion 
} from '../modules/create'
import { validate } from '../../../modules/validate'

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

const SecondStepForm = props => {

  const { handleSubmit, submitting, previous, initialValues } = props
  const {
    appKind,
    publishList,
    active,
    datalist,
    idList,
    logoList,
    wIdList,
    wLogoList,
    nameList,
    wNameList,
    appId,
    appKey,
    appName,
    appLogo,
  } = initialValues

  const appObj = compose(idList, logoList, nameList)
  const weiObj = compose(wIdList, wLogoList, wNameList)

  const totalCount = 4000
  const count = initialValues && initialValues.codeDescCount || 0
  const isDescErr = initialValues && initialValues.isDescErr || false

  const handleLogochange = (data,type)=>{
    type = type ? type : active.type
    type === "app" ? props.toggleLogoList(data) : props.WtoggleLogoList(data)
  } 
  const handleIdchange = (data,type) =>{
    type = type ? type : active.type
    type === "app" ? props.toggleIdList( data ) : props.WtoggleIdList( data )
  }
 const handleNamechange = (data,type) =>{
    type = type ? type : active.type
    type === "app" ? props.toggleNameList( data ) : props.WtoggleNameList( data )
  }
  const onChangeDesc = (e) => {
    let value = e.target.value
    let len = value.length
    if (len > totalCount) return
    let isErr = (len == 0) ? true : false
    props.updateCodeDesc({codeDescCount: len, codeDesc: value, isDescErr: isErr})
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row show-contain">
        <img src={appLogo} />
        <div className="show-text">
          <h3>{appName}</h3>
          <p><i>AppID：</i><span>{appId}</span></p>
          <p><i>AppKey：</i><span>{appKey}</span></p>
        </div>
      </div>
      <div>
        <div className="form-row code-desc">
          <label>版本介绍</label>
          <div className="row-right">
            <p><i className="iconfont icon-miashu"></i>描述此版本的新增内容，例如增添了何种新功能，有何改进之处以及修正了哪些错误。</p>
            <textarea maxLength={totalCount} placeholder="请输入版本介绍。此内容将显示在应用详情页的版本信息中。" onChange={onChangeDesc} onBlur={onChangeDesc}  ></textarea>
            { isDescErr && <span><i className="message-info">请输入版本介绍</i></span> }
          </div>
          <span className="font-count">{count} / {totalCount}</span>
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
      {/**<Field label="版本号" name="codeVersion" component={renderCodeVersion} versionsList={versionsList} /> */}
      <VersionCordModule toggleCodeVersion ={props.toggleCodeVersion}/>
      {appKind === 0 && <Field name="file" component={renderFile} label="应用文件"  genre='(FAP小程序)'/>}
      {appKind === 1 && <Field name="fileLink" type="text" placeholder="请输入网址" component={renderField} label="应用网址" />}
      {appKind === 2 && <Field name="fileObj" component={renderAPKFile} label="应用文件(APK)" />}
      <Field label="版本发布" name="autoPublish" publishList={publishList} component={renderPublishRadioBox} />
      <AssociationModule 
        appObj={appObj} 
        weiObj={weiObj} 
        handleLogochange={handleLogochange} 
        handleIdchange={handleIdchange} 
        handleNamechange={handleNamechange}
        toggleActive={props.toggleActive}
        />
      <Modal 
        type={"alert"}
        text={active.type==="app"?"应用":active.type==="widget"?"组件":"硬件"}
        active={active.trim}
        hideButtons={true}
        title={true}
        onClose={()=> props.toggleActive({trim:0,type:""})}
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
        />
      </Modal>
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
  toggleActive,
  toggleLogoList,
  toggleIdList,
  WtoggleIdList, 
  WtoggleLogoList,
  toggleNameList,
  WtoggleNameList,
  updateCodeDesc,
  toggleCodeVersion
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