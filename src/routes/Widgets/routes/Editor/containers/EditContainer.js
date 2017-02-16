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
        getAppInfo, updateFirstForm } from '../modules/edit'

class EditContainer extends Component {
  
  componentWillMount() {
    let sourceVal = getSourceVal()
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = location.href

    LoginSDK.getStatus((status, data) => {
      if (status) {
        const { params } = this.props;
        const appId = parseInt(params.appId);

        this.props.getAppInfo(appId);
        this.props.fetchTags()
        this.props.fetchCates()
        this.props.toggleStep(1)
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

  submitFirst(values) {

    this.isLogin()

    let sourceVal = getSourceVal()
    let sessionUrl = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = `${location.origin}/widgets/list`

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
          } else {
            formData.append(key, values[key])
          }
        }
      
        for (let key in values) {
        }
        const url = getDomain(`web/developer/widget/${values.appId}`)
        
        fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
          if(res.status == 200) {
            // this.props.updateAppId(res.data.appId);
            this.props.updateFirstForm(values)
            this.props.toggleStep(2);
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
    let callbackUrl = `${location.origin}/widgets/list`

    LoginSDK.getStatus((status, data) => {
      if (status) {

        !values.appId && debug.warn('缺少appId')

        const url = getDomain(`web/developer/widget/${values.appId}/code`)
        const formData = new FormData();

        const file = values.file;

        let params = {
          ...values
        };

        if(file && values.isH5App === 0) {
          Object.assign(params, file, {
            'fileName': file.originalName,
            'fileLink': file.url,
            'autoPublish': 1,
            'codeVersion': '0.0.1'
          })
          delete params.file
        } else {
          Object.assign(params, {
            'appId': values.appId,
            'codeDesc': values.codeDesc,
            'fileLink': values.fileLink,
            'autoPublish': 1,
            'codeVersion': '0.0.1'
          })
        }
        
        for (let key in params) {
          formData.append(key, params[key])
        }

        fetchUtil.postJSON(url, formData, {jsonStringify: false}).then(res=>{
          if (res.status == 200) {
            this.props.toggleStep(3);
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

  render() {
    const { page } =this.props.widgetEdit;

    const urls = {
      create: { url: `/widgets/create`, name: '发布新组件' },
      list: { url: `/widgets/list`, name: '我的组件' },
      doc: { url: `/widgets/doc` }
    }
    
    return (
      <div className="container clx">
        <Sidebar urls={urls} type="widget"/>
        <div className="sub-container">
          <Step page={page} title={'编辑组件'} />
          {
            page === 1 && <FirstStep onSubmit={::this.submitFirst} />
          }
          {
            page === 2 && <SecondStep onSubmit={::this.submitSecond} />
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
  fetchTags,
  fetchCates,
  getAppInfo,
  updateFirstForm
}

const mapStateToProps = ({widgetEdit}) => ({
  widgetEdit,
})


export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)