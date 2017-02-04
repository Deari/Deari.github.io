import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import Sidebar from 'components/Sidebar'
import FirstStep from '../components/FirstStepForm'
import SecondStep from '../components/SecondStepForm'
import Complete from '../../../components/Complete'
import Step from '../../../components/Step'

import { getDomain, getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import fetchUtil from 'routes/utils/fetchUtil'
import debug from 'routes/utils/debug'

import { toggleStep, updateForm2, getTags, getCates } from '../modules/create'

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
        this.props.toggleStep(1)
      } else {
        debug.warn("登录失败")
      }
    }, url, loginUrl, callbackUrl)
  }

  submitFirst(values) {

    // console.log(values);
    // this.props.updateForm2({ appId: 11111});
    // this.props.toggleStep(2);
    // return;

    let sessionUrl = getLoginDomain(`passport/session-check.json`)
    LoginSDK.getStatus((status, data) => {
      if (!status) {

        debug.warn("请先登录")
        return

      } else {

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
        
      }
    }, sessionUrl)
    
  }

  submitSecond(values) {
    let sessionUrl = getLoginDomain(`passport/session-check.json`)
    LoginSDK.getStatus((status, data) => {
      if (!status) {

        debug.warn("请先登录")
        return
        
      } else {
        
        const formData = new FormData();
        const { appId, codeDesc, file } = values;
        const params = Object.assign({}, file, {
          appId,
          codeDesc,
          'fileName': file && file.originalName,
          'fileLink': file && file.url
        });
      
        for(let key in params) {
          formData.append(key, params[key])
        }

        const url = getDomain(`web/developer/widget/${appId}/code`)
        fetchUtil.postJSON(url, formData, {jsonStringify: false}).then(res=>{
          if (res.status == 200) {
            console.info('提交成功')
            this.props.toggleStep(3);
          } else {
            debug.warn('请完善表单信息')
          }
        }).catch(e=>{
          debug.warn('网络错误')
        })
        
      }
    }, sessionUrl)
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
          <Step page={page}/>
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
  updateForm2
}

const mapStateToProps = ({widgetCreate}) => ({
  widgetCreate
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
