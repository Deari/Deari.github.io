import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import FirstStep from '../components/FirstStepForm'
import SecondStep from '../components/SecondStepForm'

import Complete from '../../../components/Complete'
import Step from '../../../components/Step'

import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'

import { getDomain } from 'utils/d'
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
  receiveCodeId,
  updateCodeDesc
} from '../modules/edit'

class EditContainer extends Component {
  componentWillMount () {
    const { params } = this.props
    const appId = parseInt(params.appId)
    const step = parseInt(params.step)

    if(step==2 ){
      const versionurl = getDomain(`/app/v1/bo/v1/web/developer/app/${appId}/code`)
      const versionFormData = new FormData()
      versionFormData.append('prepareVersion', '1')
      fetchUtil.postJSON(versionurl, versionFormData, { jsonStringify: false }).then(versionRes => {
        if (versionRes.status == 200) {
          this.props.receiveCodeId(versionRes.data[0].codeId)
          this.props.getAppInfo(appId).then(()=>{
            this.props.toggleStep(step)
          })
        }
      })
    } else {
      this.props.getAppInfo(appId).then(()=>{
        this.props.toggleStep(step)
      })
    }
    
    this.props.getTags()
    this.props.getCates()
  }

  submitFirst (values) {

    console.log(values)
    const formData = new FormData()

    for (let key in values) {
      if (key == 'tags') {
        for (let v of values[key]) {
          formData.append('tags[]', v)
        }
      } else if (key == 'categoryId') {
        formData.append('categoryId', 8)
      } else {
        formData.append(key, values[key])
      }
    }

    const url = getDomain(`/app/v1/bo/v1/web/developer/app/${values.appId}`)

    fetchUtil.postJSON(url, formData, { jsonStringify: false }).then(res => {
      if (res.status == 200) {
        const versionurl = getDomain(`/app/v1/bo/v1/web/developer/app/${res.data.appId}/code`)
        const versionFormData = new FormData()
        versionFormData.append('prepareVersion', '1')
        fetchUtil.postJSON(versionurl, versionFormData, { jsonStringify: false }).then(versionRes => {
          if (versionRes.status == 200) {
            this.props.receiveCodeId(versionRes.data[0].codeId)
          }
        })
        this.props.updateFirstForm(values)
        location.href = '/apps/list'
      } else {
        const errMsg = debug.getErrStatus(res.status)
        debug.warn(errMsg)
      }
    }).catch(e => {
      console.log('网络错误', e)
    })
  }

  submitSecond (values, commit) {
    console.log(values);
    // return; 

    let codeDescCount = values.codeDescCount || 0

    !values.appId && debug.warn('缺少appId')

    const file = values.file
    const fileObj = values.fileObj

    let params = {
      ...values
    }
    if (file && values.appKind === 0) {
      Object.assign(params, file, {
        'showUpdateMsg':Number(values.showUpdateMsg),
        'relatedApps':values.idList,
        'relatedWidgets':values.wIdList
      })

      if(file.url && file.originalName) {
        Object.assign(params, {
          'fileName': file.originalName,
          'fileLink': file.url,
          'fileSize': file.fileSize,
          'platform': file.platform,
        })
      }
      delete params.file
    } else if (values.appKind === 1) {
      Object.assign(params, {
        'fileLink': values.fileLink,
        'showUpdateMsg':Number(values.showUpdateMsg),
        'relatedApps':values.idList,
        'relatedWidgets':values.wIdList
      })
    } else {
      Object.assign(params, fileObj, {
        'showUpdateMsg':Number(values.showUpdateMsg),
        'relatedApps':values.idList,
        'relatedWidgets':values.wIdList
      })
      if(fileObj.url && fileObj.name) {
        Object.assign(params, {
          'fileName': fileObj.name,
          'fileLink': fileObj.url,
          'fileSize': fileObj.size,
        })
      }

      delete params.file
      delete params.codeDescCount
      delete params.isDescErr
    }

    const formData = new FormData()
    for (let key in params) {
      if (key == 'relatedApps') {
        for (let i = 0; i < params[key].length; i++) {
          formData.append('relatedApps[]', params[key][i])
        }
      } else if (key == 'relatedWidgets') {
        for (let i = 0; i < params[key].length; i++) {
          formData.append('relatedWidgets[]', params[key][i])
        }
      } else {
        formData.append(key, params[key])
      }
    }

    if (commit === 1) {
      formData.append('commit', 1)
    }

    const url = getDomain(`/app/v1/bo/v1/web/developer/app/${values.appId}/code`)

    fetchUtil.postJSON(url, formData, { jsonStringify: false }).then(res => {
      if (res.status == 200) {
        if (commit === 1) {
          this.props.toggleStep(4)
        } else {
          alert('保存成功！')
        }
      } else {
        const errMsg = debug.getErrStatus(res.status)
        debug.warn(errMsg)
      }
    }).catch(e => {
      console.log('网络错误', e)
    })
  }

  previous () {
    const appId = this.props.appsEdit.form2.appId
    window.location.href = '/apps/edit/' + appId
  }

  render () {
    const { page, form2 } = this.props.appsEdit

    const appKind = form2 && form2.appKind || ''

    let appKindName = appKind == 0 ? '( FAP小程序 类型 )' : appKind == 1 ? '( H5 类型 )' : appKind == 2 ? '( APK 类型 )' : ''

  
    return (
      <div className='container clx'>
        <SideBar pageLinks={getPageLinks('apps')} type={'apps'} />
        
        <div className='content'>
          <Step page={page} title='编辑应用' appKindName={appKindName} />
          {
            page === 1 && <FirstStep appKind={appKind} onSubmit={::this.submitFirst} />
          }
          {
            page === 2 && <SecondStep onSubmit={::this.submitSecond}
              previous={::this.previous} />
          }
          {
            page === 4 && <Complete />
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
  receiveCodeId,
  updateCodeDesc
}

const mapStateToProps = ({ appsEdit }) => ({
  appsEdit
})

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)
