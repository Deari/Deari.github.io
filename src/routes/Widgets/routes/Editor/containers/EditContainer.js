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

import { toggleStep, updateAppId, fetchTags, fetchCates, 
        getAppInfo, updateFirstForm, receiveVersionsList, receiveCodeId, updateCodeDesc} from '../modules/edit'
class EditContainer extends Component {
  
  componentWillMount() {
    let sourceVal = getSourceVal()
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = location.href
    try{
      LoginSDK.getStatus((status, data) => {
        if (status) {
          const { params } = this.props;
          const appId = parseInt(params.appId);
          const step = parseInt(params.step)
          if(step==3){
            const versionurl = getDomain(`web/developer/app/${appId}/code`)
            const versionFormData = new FormData()
            versionFormData.append("prepareVersion", "1")
            fetchUtil.postJSON(versionurl, versionFormData, { jsonStringify: false }).then(versionRes => {
              if (versionRes.status == 200) {
                this.props.receiveCodeId(versionRes.data[0].codeId)
              }
            })
          }
          this.props.getAppInfo(appId);
          this.props.fetchTags()
          this.props.fetchCates()          
          this.props.toggleStep(step)
        } else {
          debug.warn("登录失败")
        }
      }, url, loginUrl, callbackUrl)
    }catch(e){
      console.log(e)
    }
  }
  isLogin() {
    let sessionUrl = getLoginDomain(`passport/session-check.json`)
    try {
      LoginSDK.getStatus((status, data) => {
        if (!status) debug.warn('请先登录')
      }, sessionUrl)
    } catch (e){
      console.log(e)
    }

  }

  submitFirst(values) {

    this.isLogin()

    let sourceVal = getSourceVal()
    let sessionUrl = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = `${location.origin}/widgets/list`

    try{
      LoginSDK.getStatus((status, data) => {
        if (status) {

          const formData = new FormData();

          for (let key in values) {
            if (key == 'tags') {
              for (let v of values[key]) {
                formData.append('tags[]', v)
              }
            } else if (key == 'size') {
              // const sizeObj = {
              //   widgetW: values.size.w,
              //   widgetH: values.size.h
              // }
              // for (let k in sizeObj) {
              //   formData.append(k, sizeObj[k])
              // }
            } else if (key == 'categoryId') {
              formData.append('categoryId', 8)
            } else {
              formData.append(key, values[key])
            }
          }

          for (let key in values) {
          }
          const url = getDomain(`web/developer/widget/${values.appId}`)

          fetchUtil.postJSON(url, formData, { jsonStringify: false }).then(res => {
            if (res.status == 200) {
              // this.props.updateAppId(res.data.appId);
              const versionurl = getDomain(`web/developer/widget/${res.data.appId}/code`)
              const versionFormData = new FormData()
              versionFormData.append("prepareVersion", "1")
              fetchUtil.postJSON(versionurl, versionFormData, { jsonStringify: false }).then(versionRes => {
                if (versionRes.status == 200) {
                  //this.props.receiveCodeId(versionRes.data[0].codeId)
                  this.props.updateFirstForm(values)
                  location.href = "/widgets/list";
                }
              })
              this.props.updateFirstForm(values)
              location.href = "/widgets/list"
            } else {
              debug.warn('请完善表单信息')
            }
          }).catch(e => {
            console.log('网络错误', e)
          })

        } else {
          debug.warn("请先登录")
        }
      }, sessionUrl, loginUrl, callbackUrl)
    }catch(e){
      console.log(e)
    }
  }

  submitSecond(values) {
    this.isLogin()
    let sourceVal = getSourceVal()
    let sessionUrl = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = `${location.origin}/widgets/list`
    try{
      LoginSDK.getStatus((status, data) => {
        if (status) {

          let codeDescCount = values.codeDescCount || 0

          if (codeDescCount == 0) {
            this.props.updateCodeDesc({ isDescErr: true })
            return
          } else {
            this.props.updateCodeDesc({ isDescErr: false })
          }

          !values.appId && debug.warn('缺少appId')

          const url = getDomain(`web/developer/widget/${values.appId}/code`)
          const formData = new FormData();
          const file = values.file;

          let params = {
          ...values
        };
          

    if (file && values.appKind === 0) {
      Object.assign(params, file, {
        'fileName': file.originalName,
        'fileLink': file.url,
        'fileSize': file.fileSize,
        'platform': file.platform,
        'showUpdateMsg': Number(values.showUpdateMsg),
        'setting': JSON.stringify(values.configList),
        'relatedApps': values.idList,
        'relatedWidgets': values.wIdList,
      })
      delete params.file
    } else if (values.appKind === 1) {
      Object.assign(params, {
        'fileLink': values.fileLink,
        'showUpdateMsg': Number(values.showUpdateMsg),
        'relatedApps': values.idList,
        'relatedWidgets': values.wIdList,
      })
    }
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

    fetchUtil.postJSON(url, formData, { Stringify: false }).then(res => {
      if (res.status == 200) {
        this.props.toggleStep(4);
      } else {
        debug.warn('请完善表单信息')
      }
    }).catch(e => {
      console.log('网络错误', e)
    })

    } else {
      debug.warn("请先登录")
    }
    }, sessionUrl, loginUrl, callbackUrl)
    }catch(e){
      console.log(e)
    }
  }
  previous() {
    const appId = this.props.widgetCreate.form2.appId
    window.location.href = '/widgets/edit/' + appId
  }
  render() {
    const { page, form2 } =this.props.widgetEdit;

    const appKind = form2 && form2.appKind || ''

    let appKindName = appKind == 0 ? '( FAP小程序 类型 )' : appKind == 1 ? '( H5 类型 )' : appKind == 2 ? '( APK 类型 )' : ''

    const urls = {
      create: { url: `/widgets/create`, name: '创建新组件' },
      list: { url: `/widgets/list`, name: '我的组件' },
      doc: { url: `/widgets/doc` }
    }
    
    return (
      <div className="container clx">
        <Sidebar urls={urls} type="widget"/>
        <div className="sub-container">
          <Step page={page} title={'编辑组件'} appKindName={appKindName} />
          {
            page === 1 && <FirstStep onSubmit={::this.submitFirst} />
          }
          {
            page === 2 && <SecondStep onSubmit={::this.submitSecond} />
          }
          {
            page === 3 && <SecondStep onSubmit={::this.submitSecond} />
          }

          {
            page === 4 && <Complete />
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleStep,
  fetchTags,
  fetchCates,
  getAppInfo,
  updateFirstForm,
  receiveVersionsList,
  receiveCodeId,
  updateCodeDesc
}

const mapStateToProps = ({widgetEdit}) => ({
  widgetEdit,
})


export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)