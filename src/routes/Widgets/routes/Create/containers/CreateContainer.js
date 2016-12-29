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

let appId;

class CreateContainer extends Component {

  componentDidMount() {
    // console.log("props:", this.props);
    this.props.fetchTags()
    this.props.fetchCates()
  }

  submitFirst(values) {

    console.log(values);
    // this.props.toggleStep(2);
    // return;
    const formData = new FormData();

    for(let key in values) {
      if(key == 'tags') {
        for(let v of values[key]){
          formData.append('tags[]', v)
        }
      }else if(key =='size'){
        for(let k in values[key]){
          formData.append( k, values[key][k])
        }
      }else{
        formData.append(key, values[key])
      }
    }

    const url = getDomain(`http://api.intra.`,`ffan.net/bo/v1/web/developer/widget`)

    fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
      if(res.status == 200) {
        console.info("表单一提交成功")
        appId = res.data.appId
        console.log((res.data));
        this.props.toggleStep(2);

      } else {
        console.warn("表单一提交失败：", res)
      }
    }).catch(e=>{
      console.log('网络错误：', e);
    })

  }

  submitSecond(values) {
    console.log(values);

    // Do something with the form values
    const url = getDomain(
      `http://api.intra.`,`ffan.net/bo/v1/web/developer/widget/${appId}/code`
    )

    const formData = new FormData();


    const params = {
      'appId': appId,
      'codeDesc': values.codeDesc,
      'fileName': values.file.originalName,
      'fileLink': values.file.url
    };

    for(let key in values.file) {
      params[key] = values.file[key]
    }

    for(let key in params) {
      formData.append(key, params[key])
    }

    fetchUtil.postJSON(url, formData, {jsonStringify: false}).then(res=>{
      if (res.status == 200) {
        this.props.toggleStep(3);
      } else {
        console.warn(res);
      }
    })
  }

  render() {
    const urls = {
      create: { url: `/widgets/create` },
      list: { url: `/widgets/list` },
      doc: { url: `/widgets/doc` }
    }
    const { page } =this.props.widgetCreate;

    return (
      <div className="container clx">
        <Sidebar urls={urls}  type="组件"/>
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
}

const mapStateToProps = (state) => {
  return {
    widgetCreate: state.widgetCreate
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
