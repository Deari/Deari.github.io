import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import FirstStep from '../components/FirstStepForm'
import SecondStep from '../components/SecondStepForm'

import Complete from '../../../components/Complete'
import Step from '../../../components/Step'

import Sidebar from 'components/Sidebar'

import { getDomain, getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import fetchUtil from 'utils/fetchUtil'
import debug from 'utils/debug'

import { 
  toggleStep, 
  getTags, 
  getCates, 
  getAppInfo,
  updateFirstForm,
  receiveVersionsList,
  receiveCodeId
} from '../modules/edit'

class EditContainer extends Component {
  
  componentWillMount() {
    let sourceVal = getSourceVal()
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = location.href

    LoginSDK.getStatus((status, data) => {
      if (status) {
        const { params } = this.props
        const appId = parseInt(params.appId)
        this.props.toggleStep(1)
        this.props.getTags()
        this.props.getCates()
        this.props.getAppInfo(appId)
      } else {
        debug.warn("登录失败")
      }
    }, url, loginUrl, callbackUrl)
  }

  isLogin() {
    let sessionUrl = getLoginDomain(`passport/session-check.json`)
    LoginSDK.getStatus((status, data) => {
      if (!status) debug.warn('请先登录')
    }, sessionUrl)
  }
  getVersionList(codeVersion,reviewStatus){
    const versionsArray0 = [
      parseInt(codeVersion.split(".")[0]), parseInt(codeVersion.split(".")[1]), parseInt(codeVersion.split(".")[1]) + 1
    ]
    const versionsArray1 = [
      parseInt(codeVersion.split(".")[0]), parseInt(codeVersion.split(".")[1]) + 1, 0
    ]
    const versionsArray2 = [
      parseInt(codeVersion.split(".")[0]) + 1, 0, 0
    ]

    const versionsList = [
      { 'value': reviewStatus === 0 || reviewStatus === 3 ? codeVersion : versionsArray0.join('.') },
      { 'value': versionsArray1.join('.') },
      { 'value': versionsArray2.join('.') }
    ]    
    return versionsList
  }
  
  submitFirst(values) {

    this.isLogin()

    let sourceVal = getSourceVal()
    let sessionUrl = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = `${location.origin}/apps/list`

    LoginSDK.getStatus((status, data) => {
      if (status) {

        const formData = new FormData()

        for(let key in values) {
          if(key == 'tags') {
            for(let v of values[key]){
              formData.append('tags[]', v)
            }
          } else {
            formData.append(key, values[key])
          }
        }

        const url = getDomain(`web/developer/app/${values.appId}`)

        fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
          if(res.status == 200) {
            
            const versionurl = getDomain(`web/developer/app/${res.data.appId}/code`)
            const versionFormData = new FormData()
            versionFormData.append("prepareVersion", "1")
            fetchUtil.postJSON(versionurl, versionFormData, { jsonStringify: false}).then(versionRes =>{
               if(versionRes.status == 200) {
                 const versionsList = this.getVersionList(versionRes.data.codeVersion,versionRes.data.reviewStatus)
                 this.props.receiveVersionsList(versionsList)
                 this.props.receiveCodeId(versionRes.data.codeId)
               }
            })
            this.props.updateFirstForm(values)
            this.props.toggleStep(2)            
          } else {
            debug.warn('请完善表单信息')
          }
        }).catch(e=>{
          console.log('网络错误', e)
        })

      } else {
        debug.warn("请先登录")
      }
    }, sessionUrl, loginUrl, callbackUrl)
  }

  submitSecond(values) {
    this.isLogin()
    let sourceVal = getSourceVal()
    let sessionUrl = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = `${location.origin}/apps/list`

    LoginSDK.getStatus((status, data) => {
      if (status) {

        !values.appId && debug.warn('缺少appId')

        const file = values.file
        let params = {
          ...values
        }
        if(file && values.isH5App === 0) {
          Object.assign(params, file, {
            'fileName': file.originalName,
            'fileLink': file.url,
            'showUpdateMsg':Number(values.showUpdateMsg),
            'relatedApps':values.idList,
            'relatedWidgets':values.wIdList,
          })
          delete params.file
        } else {
          Object.assign(params, {
            'fileLink': values.fileLink,
            'showUpdateMsg':Number(values.showUpdateMsg),
            'relatedApps':values.idList,
            'relatedWidgets':values.wIdList,
          })
        }

        const formData = new FormData()
        for (let key in params) {
          if (key == "relatedApps") {
            for (let i = 0; i < params[key].length; i++) {
              formData.append('relatedApps[]', params[key][i])
            }
          } else if (key == "relatedWidgets") {
            for (let i = 0; i < params[key].length; i++) {
              formData.append('relatedWidgets[]', params[key][i])
            }
          } else {
            formData.append(key, params[key])
          }
        }

        const url = getDomain(`web/developer/app/${values.appId}/code`)
        fetchUtil.postJSON(url, formData, {jsonStringify: false}).then(res=>{
          if (res.status == 200) {
            this.props.toggleStep(3)
          } else {
            debug.warn('请完善表单信息')
          }
        }).catch(e=>{
          console.log('网络错误', e)
        })
        
      } else {
        debug.warn("请先登录")
      }
    }, sessionUrl, loginUrl, callbackUrl)
  }

  previous() {
    const appId = this.props.appsEdit.form2.appId
    window.location.href = '/apps/edit/' + appId
  }

  render() {
    const { page } =this.props.appsEdit

    const urls = {
      create: { url: `/apps/create`, name: '发布新应用' },
      list: { url: `/apps/list`, name: '我的应用' },
      doc: { url: `/apps/doc` }
    }
    
    return (
      <div className="container clx">
        <Sidebar urls={urls} />
        <div className="sub-container">
          <Step page={page} title={'编辑应用'} />
          {
            page === 1 && <FirstStep onSubmit={::this.submitFirst} />
          }
          {
            page === 2 && <SecondStep onSubmit={::this.submitSecond} 
              previous={::this.previous}/>
          }
          {
            page === 3 && <Complete />
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  toggleStep,
  getTags,
  getCates,
  getAppInfo,
  updateFirstForm,
  receiveVersionsList,
  receiveCodeId
}

const mapStateToProps = ({appsEdit}) => ({
  appsEdit,
})


export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)