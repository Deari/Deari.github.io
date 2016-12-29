import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { validate, warn } from '../modules/validate'
import { test } from '../modules/create'

import Sidebar from '../../../../../components/Sidebar'
import FirstStep from '../components/FirstStepForm'
import SecondStep from '../components/SecondStepForm'
import Complete from '../components/Complete'
import Step from '../components/Step'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'

import { toggleStep, updateAppId, fetchTags, fetchCates } from '../modules/create'

class CreateContainer extends Component {
  
  componentDidMount() {
    this.props.fetchTags()
    this.props.fetchCates()
  }

  submitFirst(values) {

    // console.log("values", values);
    // this.props.updateAppId(123456);
    // this.props.toggleStep(2);
    // return;

    const formData = new FormData();

    for(let key in values) {
      if(key == 'tags') {
        for(let v of values[key]){
          formData.append('tags[]', v)
        }
      } else {
        formData.append(key, values[key])
      }
    }

    const url = getDomain(`http://api.intra.`,`ffan.net/bo/v1/web/developer/app`)
    
    fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
      if(res.status == 200) {
        console.info("提交成功: ", res.data);
        this.props.updateAppId(res.data.appId);
        this.props.toggleStep(2);
      } else {
        console.warn("提交失败：", res)
      }
    }).catch(e=>{
      console.log('网络错误：', e);
    })
  }

  submitSecond(values) {
    if(!values.appId) {
      alert('缺少appId')
    }

    const url = getDomain(`http://api.intra.`, `ffan.net/bo/v1/web/developer/app/${values.appId}/code`)
    const formData = new FormData();

    const file = values.file;
    const params = Object.assign({}, file, {
      'appId': values.appId,
      'codeDesc': values.codeDesc,
      'fileName': file.originalName,
      'fileLink': file.url
    })

    for (let key in params) {
      formData.append(key, params[key])
    }

    fetchUtil.postJSON(url, formData, {jsonStringify: false}).then(res=>{
      if (res.status == 200) {
        console.info('提交成功')
        this.props.toggleStep(3);
      } else {
        alert('提交失败：'+JSON.stringify(res));
        console.warn('提交失败：', res)
      }
    }).catch(e=>{
      alert('提交失败：'+JSON.stringify(e));
      console.warn('网络错误', e);
    })
  }

  render() {
    const { page } =this.props.create;

    const urls = {
      create: { url: `/apps/create` },
      list: { url: `/apps/list` },
      doc: { url: `/apps/doc` }
    }

    return (
      <div className="container clx">
        <Sidebar urls={urls} />
        <div className="sub-container">
          <Step page={page}/>
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
  updateAppId
}

const mapStateToProps = (state) => {
  return {
    create: state.appsCreate
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)