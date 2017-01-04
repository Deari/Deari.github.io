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

import { toggleStep, getTags, getCates } from '../modules/create'

import debug from '../../../../utils/debug'

class CreateContainer extends Component {

  state = {
    firstStepValue: '',
    hardwareId: ''
  }

  componentWillMount() {
    this.props.toggleStep(1);
    this.props.getTags()
    this.props.getCates()
  }

  submitFirst(values) {
    
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


    for(let v of values.tags) {
      formData.append("hardwareTags[]", v);
    }

    const url = getDomain(`http://api.intra.`,`ffan.net/bo/v1/web/hardware/addHardware/step1`)
    
    fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
      if(res.status == 200) {
        const hardwareId = res.data.hardwareId;
        const firstStepValue = { ...values }

        this.setState({firstStepValue, hardwareId}, () => {
          this.props.toggleStep(2);
        })

      } else {
        debug.warn('表单一提交失败', res)
      }
    }).catch(e=>{
      debug.warn('网络错误', e)
    })
    
  }

  submitSecond(values) {
    const { firstStepValue, hardwareId } = this.state
    const SecondStepValues = {
      ...firstStepValue,
      ...values
    }

    const formData = new FormData();
    const params = {
      hardwareId : hardwareId,
      hardwareName : SecondStepValues['hardwareName'],
      hardwareLogo : SecondStepValues['hardwareLogo'],
      hardwareFunction : SecondStepValues['hardwareFunction'],
      majorCategoryId : SecondStepValues.category['majorCategoryId'],
      minorCategoryId : SecondStepValues.category['minorCategoryId'],

      hardwareMode: SecondStepValues['hardwareMode'],
      hardwareBrand: SecondStepValues['hardwareBrand'],
      hardwareProducer: SecondStepValues['hardwareProducer'],
      commType1: SecondStepValues['commType1'] ? 1 : 0,
      commType2: SecondStepValues['commType2'] ? 1 : 0,
      hardwareDetail: SecondStepValues['hardwareDetail'],
      sdkType: SecondStepValues['sdkType'],
      os: SecondStepValues['os'],
      hardwarePlatform: SecondStepValues['hardwarePlatform'],
      hardwareReport: SecondStepValues['hardwareReport'],
    };

    for(let key in params) {
      formData.append(key, params[key]);
    }

    for(let v of SecondStepValues.tags) {
      formData.append("hardwareTags[]", v);
    }

    for(let key in SecondStepValues.hardwarePics) {
      formData.append("hardwarePics[]", SecondStepValues.hardwarePics[key]);
    }

    const url = getDomain(`http://api.intra.`,`ffan.net/bo/v1/web/hardware/addHardware/step2`)

    fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
      if(res.status == 200) {
          this.props.toggleStep(3);
      } else {
        debug.warn('表单二提交失败', res)
      }
    }).catch(e=>{
      debug.warn('网络错误', e)
    })

  }

  render() {
    const { page } = this.props.hardwareCreate;

    const urls = {
      create: { url: `/hardware/create` },
      list: { url: `/hardware/list` },
      doc: { url: `/hardware/doc` }
    }

    return (
      <div className="container clx">
        <Sidebar urls={urls} type="硬件"/>
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
  getTags,
  getCates,
}

const mapStateToProps = ({ hardwareCreate }) => ({
  hardwareCreate
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
