import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import Sidebar from 'components/Sidebar'
import ChoiceStep from '../components/ChoiceStep'
import FirstStep from '../components/FirstStepForm'
import SecondStep from '../components/SecondStepForm'
import Complete from '../../../components/Complete'
import Step from '../../../components/Step'

import { getDomain, getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import fetchUtil from 'utils/fetchUtil'
import debug from 'utils/debug'

import { toggleStep, updateForm2, updateIsH5App, getTags, getCates } from '../modules/create'

class CreateContainer extends Component {

  componentWillMount() {
    let sourceVal = getSourceVal()
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = location.href

    LoginSDK.getStatus((status, data) => {
      if (status) {
        this.props.getTags()
        this.props.getCates()
        this.props.toggleStep(0)
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

  submitChoice(values) {
    this.props.updateIsH5App({isH5App: values})
    this.props.toggleStep(1)
  }

  submitFirst(values) {

    this.isLogin()

    let sourceVal = getSourceVal()
    let sessionUrl = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = `${location.origin}/widgets/list`

    LoginSDK.getStatus((status, data) => {
      if (status) {
        
        const formData = new FormData();

        for(let key in values) {
          if(key == 'tags') {
            for(let v of values[key]){
              formData.append('tags[]', v)
            }
          } else if(key =='size'){
            for(let k in values[key]){
              formData.append( k, values[key][k])
            }
          } else {
            formData.append(key, values[key])
          }
        }

        const url = getDomain(`web/developer/widget`)
        fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
          if(res.status == 200) {
            console.info("提交成功: ", res.data)
            this.props.updateForm2({ appId: res.data.appId});
            this.props.toggleStep(2);
          } else {
            debug.warn('请完善表单信息')
          }
        }).catch(e=>{
          debug.warn('网络错误')
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
    let callbackUrl = `${location.origin}/widgets/list`

    LoginSDK.getStatus((status, data) => {
      if (status) {

        !values.appId && debug.warn('缺少appId')

        const formData = new FormData();
        const { appId, codeDesc } = values;
        let params = {}

        if (values.isH5App === 0) {
          const file = values.file
          params = Object.assign({}, file, {
            appId,
            codeDesc,
            'fileName': file && file.originalName,
            'fileLink': file && file.url
          })
        } else {
          params = {
            appId,
            codeDesc,
            'fileLink': values.fileLink
          }
        }
      
        for(let key in params) {
          formData.append(key, params[key])
        }

        const url = getDomain(`web/developer/widget/${appId}/code`)
        fetchUtil.postJSON(url, formData, {jsonStringify: false}).then(res=>{
          if (res.status == 200) {
            this.props.toggleStep(3);
          } else {
            debug.warn('请完善表单信息')
          }
        }).catch(e=>{
          debug.warn('网络错误')
        })
        
      } else {
        debug.warn("请先登录")
      }
    }, sessionUrl, loginUrl, callbackUrl)
  }
  
  previous() {
    const appId = this.props.widgetCreate.form2.appId;
    window.location.href = '/widgets/edit/' + appId;
  }

  render() {
    const urls = {
      create: { url: `/widgets/create`, name: '发布新组件' },
      list: { url: `/widgets/list`, name: '我的组件' },
      doc: { url: `/widgets/doc` }
    }
    const { page } =this.props.widgetCreate;

    return (
      <div className="container clx">
        <Sidebar urls={urls}  type="widget"/>
        <div className="sub-container">
          {
            page === 0 && <ChoiceStep onSubmit={::this.submitChoice} />
          }
          { page > 0 && <Step page={page}/> }
          {
            page === 1 && <FirstStep onSubmit={::this.submitFirst} />
          }
          {
            page === 2 && <SecondStep onSubmit={::this.submitSecond} previous={::this.previous} />
          }
          {
            page === 3 && <Complete />
          }
          
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleStep,
  getTags,
  getCates,
  updateForm2,
  updateIsH5App
}

const mapStateToProps = ({widgetCreate}) => ({
  widgetCreate
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
