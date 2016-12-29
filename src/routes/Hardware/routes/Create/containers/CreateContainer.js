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

import { toggleStep, fetchTags, fetchCates } from '../modules/create'

let appId;
let result;

class CreateContainer extends Component {

  componentDidMount() {
    // console.log("props:", this.props);
    this.props.fetchTags()
    this.props.fetchCates()
  }

  submitFirst(values) {
    
    console.log(values);

    const formData = new FormData();
    const params = {
      hardwareName : values['hardwareName'],
      hardwareLogo : values['hardwareLogo'],
      hardwareFunction : values['hardwareFunction'],
      majorCategoryId : values.category['majorCategoryId'],
      minorCategoryId : values.category['minorCategoryId']
    };

    for(let key in params) {
      formData.append(key, params[key]);
    }

    for(let key in values.tags) {
      formData.append("tags[]", values.tags[key]);
    }

    const url = getDomain(`http://api.intra.`,`/bo/v1/web/hardware/addHardware/1`)
    
    fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
      if(res.status == 200) {
        console.info("表单一提交成功")
        
        appId = res.data.appId;
        
        console.log("result:", res.data);

        this.props.toggleStep(2);

      } else {
        console.warn("表单一提交失败：", res)
      }
    }).catch(e=>{
      console.log('网络错误：', e);
      this.props.toggleStep(2);
    })
    
  }

  submitSecond(values) {
    console.log(values);

    const url = getDomain(
      `http://api.intra.`,`ffan.net/bo/v1/web/hardware/addHardware/step2`
    )

    const formData = new FormData();

  }

  render() {
    const { page } =this.props.create;

    const urls = {
      create: { url: `/hardware/create` },
      list: { url: `/hardware/list` },
      doc: { url: `/hardware/doc` }
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
}

const mapStateToProps = (state) => {
  return {
    create: state.hardwareCreate
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
