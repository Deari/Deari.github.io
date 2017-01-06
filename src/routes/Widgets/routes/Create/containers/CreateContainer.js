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

import { toggleStep, updateForm2, getTags, getCates } from '../modules/create'

class CreateContainer extends Component {

  componentWillMount() {
    this.props.getTags()
    this.props.getCates()
    this.props.toggleStep(1)
  }

  submitFirst(values) {

    // console.log(values);
    // this.props.updateForm2({ appId: 11111});
    // this.props.toggleStep(2);
    // return;
    
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

    const url = getDomain(`http://api.intra.`,`ffan.net/bo/v1/web/developer/widget`)

    fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
      if(res.status == 200) {
        console.info("提交成功: ", res.data)
        this.props.updateForm2({ appId: res.data.appId});
        this.props.toggleStep(2);
      } else {
        alert("提交失败：", JSON.stringify(res))
        console.warn("提交失败：", res)
      }
    }).catch(e=>{
      alert("网络错误：", JSON.stringify(e))
    })

  }

  submitSecond(values) {
    console.log("values", values);
    // return;
    const formData = new FormData();
    const { appId, codeDesc, file } = values;
    const params = Object.assign({}, file, {
      appId,
      codeDesc,
      'fileName': file.originalName,
      'fileLink': file.url
    });
  
    for(let key in params) {
      formData.append(key, params[key])
    }

    const url = getDomain(
      `http://api.intra.`,`ffan.net/bo/v1/web/developer/widget/${appId}/code`
    )

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
  previous() {
    const appId = this.props.widgetCreate.form2.appId;
    window.location.href = '/widgets/edit/' + appId;
  }

  render() {
    const urls = {
      create: { url: `/widgets/create`, name: '创建新组件' },
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
