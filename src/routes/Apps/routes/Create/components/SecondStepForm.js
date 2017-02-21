import React from 'react'
import { connect} from 'react-redux'
import { IndexLink, Link } from 'react-router' 
import { Field, reduxForm } from 'redux-form'

import Modal from 'components/Modal'
import CreateAssocation from '../../../components/CreateAssocation'

import { renderField, versionTextArea, renderFile ,renderSelect, renderPublishRadioBox, ModalList,} from '../../../modules/renderField'
import { toggleActive, toggleLogoList, toggleIdList, WtoggleIdList, WtoggleLogoList} from '../modules/create'
import { validate } from '../../../modules/validate'

const compose = (arr1, arr2) => {
  const newArray = []
  if(Array.isArray(arr1) && arr1.length !==0){
   
    for (let i = 0; i < arr1.length; i++) {
      const obj = {};
      obj.id = arr1[i]
      obj.logo = arr2[i]
      newArray.push(obj)
    }
  }
  return newArray
}

const SecondStepForm = props => {

  const { handleSubmit, submitting, previous, initialValues } = props
  const {isH5App,publishList,versionsList, active, datalist, idList, logoList,wIdList,wLogoList} = initialValues

  const appObj = compose(idList,logoList)
  const weiObj = compose(wIdList,wLogoList)

  const handlechange = (data,type)=>{
    type = type ? type : active.type
    type === "app" ? props.toggleLogoList(data) : props.WtoggleLogoList(data)
  } 
  const handleIdchange = (data,type) =>{
    type = type ? type : active.type
    type === "app" ? props.toggleIdList( data ) : props.WtoggleIdList( data )
  }
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
      {isH5App === 0 && <Field name="file" component={renderFile} label="应用文件" />}
      {isH5App === 1 && <Field name="fileLink" type="text" placeholder="请输入网址" component={renderField} label="应用网址" />}
      <Field label="版本发布" name="autoPublish" publishList={publishList} component={renderPublishRadioBox} />
      <CreateAssocation appObj={appObj} weiObj={weiObj} handlechange={handlechange} handleIdchange={handleIdchange} />
      <Modal type={"alert"}
             text={active.type==="app"?"应用":active.type==="weiget"?"组件":"硬件"}
             active={active.trim}
             hideButtons={true}
             title={true}
             onClose={()=> props.toggleActive({trim:0,type:""})}
      >
      <Field name={active.type+"IdList"} component={ModalList} datalist={datalist} idList={active.type==='app'?idList:wIdList} type={active.type} handlechange={handlechange} handleIdchange={handleIdchange}/>
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
  WtoggleLogoList
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