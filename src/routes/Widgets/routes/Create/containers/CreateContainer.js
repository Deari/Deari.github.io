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

import { getDomain } from 'utils/d'
import { getSourceVal } from 'utils/d'
import LoginSDK from 'utils/loginSDK'
import fetchUtil from 'utils/fetchUtil'
import debug from 'utils/debug'

import { toggleStep, updateForm2, updateAppkind, getTags, getCates, updateCodeDesc } from '../modules/create'
class CreateContainer extends Component {
  componentWillMount () {
    this.props.getTags()
    this.props.getCates()
    this.props.toggleStep(0)
  }
  submitChoice (values) {
    this.props.updateAppkind({ appKind: values })
    this.props.toggleStep(1)
  }

  submitFirst (values) {
    const formData = new FormData()
    for (let key in values) {
      if (key == 'tags') {
        for (let v of values[key]) {
          formData.append('tags[]', v)
        }
      } else if (key == 'size') {
        for (let k in values[key]) {
          formData.append(k, values[key][k])
        }
      } else if (key == 'categoryId') {
        formData.append('categoryId', 8)
      } else {
        formData.append(key, values[key])
      }
    }

    const url = getDomain(`/app/v1/bo/v1/web/developer/widget`)
    fetchUtil.postJSON(url, formData, { jsonStringify: false }).then(res => {
      if (res.status == 200) {
        console.info('提交成功: ', res.data)
        const versionurl = getDomain(`/app/v1/bo/v1/web/developer/widget/${res.data.appId}/code`)
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
            this.props.updateForm2({ codeId: versionRes.data[0].codeId })
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

    const formData = new FormData()
    const file = values.file
    let params = {
      ...values
    }

    if (values.appKind === 0) {
      params = Object.assign({}, file, {
        'appId': values.appId,
        'codeId': values.codeId,
        'codeDesc': values.codeDesc,
        'autoPublish': values.autoPublish,
        'codeVersion': values.codeVersion,

        'fileName': file && file.originalName,
        'fileLink': file && file.url,
        'fileSize': file.fileSize,
        'platform': file.platform,
        'setting': JSON.stringify(values.configList),
        'relatedApps': values.idList,
        'relatedWidgets': values.wIdList,

        'showUpdateMsg': Number(values.showUpdateMsg)
      })
    } else if (values.appKind === 1) {
      params = {
        'appId': values.appId,
        'codeId': values.codeId,
        'codeDesc': values.codeDesc,
        'autoPublish': values.autoPublish,
        'codeVersion': values.codeVersion,
        'fileLink': values.fileLink,
        'showUpdateMsg': Number(values.showUpdateMsg),
        'relatedApps': values.idList,
        'relatedWidgets': values.wIdList
      }
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
    const url = getDomain(`/app/v1/bo/v1/web/developer/widget/${values.appId}/code`)
    fetchUtil.postJSON(url, formData, { jsonStringify: false }).then(res => {
      if (res.status == 200) {
        this.props.toggleStep(2);
      } else {
        const errMsg = debug.getErrStatus(res.status)
        debug.warn(errMsg)
      }
    }).catch(e => {
      console.log('网络错误', e)
    })
  }

  previous () {
    const appId = this.props.widgetCreate.form2.appId
    window.location.href = '/widgets/edit/' + appId
  }

  render () {
    const { page, form2 } = this.props.widgetCreate

    const appKind = form2 && form2.appKind || ''

    let appKindName = appKind == 0 ? '( FAP小程序 类型 )' : appKind == 1 ? '( H5 类型 )' : appKind == 2 ? '( APK 类型 )' : ''

    return (
      <div className='container'>
        <SideBar pageLinks={getPageLinks('widgets')} type={'widgets'} />
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

const mapStateToProps = ({ widgetCreate }) => ({
  widgetCreate
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)

