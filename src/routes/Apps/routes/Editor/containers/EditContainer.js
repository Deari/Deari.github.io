import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import FirstStep from '../components/FirstStepForm'
import SecondStep from '../components/SecondStepForm'

import Complete from '../../../components/Complete'
import Step from '../../../components/Step'

import Sidebar from '../../../../../components/Sidebar'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'
import debug from '../../../../utils/debug'

import { 
  toggleStep, 
  getTags, 
  getCates, 
  getAppInfo,
  getAppCodeInfo 
} from '../modules/edit'

class EditContainer extends Component {
  
  componentWillMount() {
    const { params } = this.props;
    const appId = parseInt(params.appId);
    this.props.toggleStep(1)
    this.props.getTags()
    this.props.getCates()
    this.props.getAppInfo(appId);
    this.props.getAppCodeInfo(appId);
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

    const url = getDomain(`http://api.intra.`,`ffan.net/bo/v1/web/developer/app/${values.appId}`)
    fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
      if(res.status == 200) {
        this.props.toggleStep(2);
      } else {
        debug.warn('提交失败', res);
      }
    }).catch(e=>{
        debug.warn('提交失败', e);
    })
  }

  submitSecond(values) {
    console.log("values", values);
    if(!values.appId) {
      alert('缺少appId')
    }

    const file = values.file;
    let params = {
      ...values
    };
    if(file) {
      Object.assign(params, file, {
        'fileName': file.originalName,
        'fileLink': file.url
      })
    }
    delete params.file;

    const formData = new FormData();
    for (let key in params) {
      formData.append(key, params[key])
    }

    const url = getDomain(`http://api.intra.`, `ffan.net/bo/v1/web/developer/app/${values.appId}/code`)
    fetchUtil.postJSON(url, formData, {jsonStringify: false}).then(res=>{
      if (res.status == 200) {
        this.props.toggleStep(3);
      } else {
        debug.warn('提交失败：', res);
      }
    }).catch(e=>{
      debug.warn('提交失败', res);
    })
  }

  previous() {
    const appId = this.props.appsEdit.form2.appId;
    window.location.href = '/apps/edit/' + appId;
  }

  render() {
    const { page } =this.props.appsEdit;

    const urls = {
      create: { url: `/apps/create` },
      list: { url: `/apps/list` },
      doc: { url: `/apps/doc` }
    }
    
    return (
      <div className="container clx">
        <Sidebar urls={urls} />
        <div className="sub-container">
          <Step page={page} title={'编辑应用'}/>
          {
            page === 1 && <FirstStep onSubmit={::this.submitFirst} />
          }
          {
            page === 2 && <SecondStep onSubmit={::this.submitSecond} 
              previous={::this.previous}/>
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
  getAppInfo,
  getAppCodeInfo
}

const mapStateToProps = ({appsEdit}) => ({
  appsEdit,
})


export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)