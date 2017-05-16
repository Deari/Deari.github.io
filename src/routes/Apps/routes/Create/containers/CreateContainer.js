import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'

import ChoiceStep from '../components/ChoiceStep'
import FirstStep from '../components/FirstStepForm'
import SecondStep from '../components/SecondStepForm'
import FinishFirstStep from '../components/FinishFirstStep'
import Complete from '../../../components/Complete'
import Step from '../../../components/Step'

import { getDomain, getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import fetchUtil from 'utils/fetchUtil'
import debug from 'utils/debug'

import { toggleStep, updateForm2, updateAppkind, getTags, getCates, updateCodeDesc } from '../modules/create'

class CreateContainer extends Component {
  componentWillMount() {
    this.props.getTags()
    this.props.getCates()
    this.props.toggleStep(0)
  }

  submitChoice (values) {
    this.props.updateAppkind({ appKind: values })
    this.props.toggleStep(1)
  }

  submitFirst (values) {
    console.log(values);
    return;
    
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

    const url = getDomain(`web/developer/app`)

    fetchUtil.postJSON(url, formData, { jsonStringify: false }).then(res => {
      if (res.status == 200) {
        const versionurl = getDomain(`web/developer/app/${res.data.appId}/code`)
        const versionFormData = new FormData()
        versionFormData.append('prepareVersion', '1')
        this.props.updateForm2({
          appId: res.data.appId,
          appName: res.data.appName,
          appLogo: res.data.appLogo,
          developerKey: res.data.developerKey,
          developerSecret: res.data.developerSecret
        })
        fetchUtil.postJSON(versionurl, versionFormData, { jsonStringify: false }).then(versionRes => {
          if (versionRes.status == 200) {
            this.props.updateForm2({
              codeId:versionRes.data[0].codeId
            })
          }
        })
        this.props.toggleStep(2)
        window.scrollTo(0, 0)
      } else {
        const errMsg = debug.getErrStatus(res.status)
        debug.warn(errMsg)
      }
    }).catch(e => {
      console.log('网络错误', e)
    })
  }

  submitSecond (values) {
    let codeDescCount = values.codeDescCount || 0

    if (codeDescCount == 0) {
      this.props.updateCodeDesc({ isDescErr: true })
      return
    } else {
      this.props.updateCodeDesc({ isDescErr: false })
    }

    !values.appId && debug.warn('缺少appId')

    const url = getDomain(`web/developer/app/${values.appId}/code`)
    const formData = new FormData()
    const file = values.file
    const fileObj = values.fileObj
    let params = {
      ...values
    }
    if (values.appKind === 0) {
      params = Object.assign({}, file, {
        'codeId': values.codeId,
        'codeDesc': values.codeDesc,
        'autoPublish': values.autoPublish,
        'codeVersion': values.codeVersion,

        'fileName': file.originalName,
        'fileLink': file.url,
        'fileSize': file.fileSize,
        'platform': file.platform,

        'showUpdateMsg': Number(values.showUpdateMsg),
        'relatedApps': values.idList,
        'relatedWidgets': values.wIdList
      })
    } else if (values.appKind === 1) {
      params = {
        'codeId': values.codeId,
        'codeDesc': values.codeDesc,
        'autoPublish': values.autoPublish,
        'codeVersion': values.codeVersion,
        'fileLink':values.fileLink,
        'showUpdateMsg':Number(values.showUpdateMsg),
        'relatedApps':values.idList,
        'relatedWidgets':values.wIdList
      }
    } else {
      params = Object.assign({}, fileObj, {
        'codeId': values.codeId,
        'codeDesc': values.codeDesc,
        'autoPublish': values.autoPublish,
        'codeVersion': values.codeVersion,

        'fileName': fileObj.name,
        'fileLink': fileObj.url,
        'fileSize': fileObj.size,

        'showUpdateMsg': Number(values.showUpdateMsg),
        'relatedApps': values.idList,
        'relatedWidgets': values.wIdList
      })
    }

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

      fetchUtil.postJSON(url, formData, { jsonStringify: false }).then(res => {
        if (res.status == 200) {
          this.props.toggleStep(2)
        } else {
          const errMsg = debug.getErrStatus(res.status)
          debug.warn(errMsg)
        }
      }).catch(e => {
        console.log('网络错误', e)
      })
  }

  previous () {
    const appId = this.props.appsCreate.form2.appId
    window.location.href = '/apps/edit/' + appId
  }

  render () {
    const { page, form2 } = this.props.appsCreate

    const appKind = form2 && form2.appKind || ''

    let appKindName = appKind == 0 ? '( FAP小程序 类型 )' : appKind == 1 ? '( H5 类型 )' : appKind == 2 ? '( APK 类型 )' : ''

    return (
      <div className='container'>
        <SideBar pageLinks={getPageLinks('apps')} type={'apps'} />
        <div className='content'>
          {
            page === 0 && <ChoiceStep onSubmit={::this.submitChoice} />
          }
          { page > 0 && <Step page={page} appKindName={appKindName} /> }
          {
            page === 1 && <FirstStep onSubmit={::this.submitFirst} />
          }
          {
            page === 2 && <FinishFirstStep />
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
  updateForm2,
  updateAppkind,
  updateCodeDesc
}

const mapStateToProps = ({ appsCreate }) => ({
  appsCreate
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
