import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { validate, warn } from '../modules/validate'
import Complete from '../../../components/Complete'
import Step from '../../../components/Step'

import Sidebar from '../../../../../components/Sidebar'
import FirstStep from '../components/FirstStepForm'
import SecondStep from '../components/SecondStepForm'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'
import debug from '../../../../utils/debug'

import { toggleStep, updateForm2, getTags, getCates } from '../modules/create'

class CreateContainer extends Component {
  
  componentWillMount() {
    this.props.getTags()
    this.props.getCates()
    this.props.toggleStep(1)
  }

  submitFirst(values) {

    // console.log("values", values);
    // this.props.updateForm2({
    //   appId: 111111
    // });
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
        debug.info('提交成功', res.data)
        this.props.updateForm2({
          appId: res.data.appId
        });
        this.props.toggleStep(2);
      } else {
        debug.warn('提交失败', res)
      }
    }).catch(e=>{
      debug.warn('网络错误', e)
    })
  }

  submitSecond(values) {
    !values.appId && debug.warn('缺少appId');

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

    fetchUtil.postJSON(url, formData, { jsonStringify: false }).then(res => {
      if (res.status == 200) {
        this.props.toggleStep(3);
      } else {
        debug.warn('提交失败', JSON.stringify(res))
      }
    }).catch(e => {
      debug.warn('网络错误', JSON.stringify(e))
    })
  }

  previous() {
    const appId = this.props.appsCreate.form2.appId;
    window.location.href = '/apps/edit/' + appId;
  }

  render() {
    const { page } = this.props.appsCreate;

    const urls = {
      create: { url: `/apps/create`, name: '创建新应用' },
      list: { url: `/apps/list`, name: '我的应用' },
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
            page === 2 && <SecondStep onSubmit={::this.submitSecond}
              previous={::this.previous} />
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

const mapStateToProps = ({ appsCreate }) => ({
  appsCreate
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)