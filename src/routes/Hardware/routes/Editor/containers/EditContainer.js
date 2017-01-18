import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import Sidebar from 'components/Sidebar'
import FirstStep from '../components/FirstStepForm'
import SecondStep from '../components/SecondStepForm'
import Complete from '../../../components/Complete'
import Step from '../../../components/Step'

import { getDomain } from 'utils/domain'
import fetchUtil from 'routes/utils/fetchUtil'
import debug from 'routes/utils/debug'

import { toggleStep, getTags, getCates, getSdkInfo, getHDInfo, updateFirstForm } from '../modules/edit'



class CreateContainer extends Component {

  state = {
    firstStepValue: '',
    hardwareId: ''
  }

  componentWillMount() {
    const { params } = this.props
    const id = parseInt(params.id)
    this.props.toggleStep(1)
    this.props.getTags()
    this.props.getCates()
    this.props.getSdkInfo()
    this.props.getHDInfo(id)
  }

  submitFirst(values) {
    console.log(values)    
    const formData = new FormData()
    const params = {
      hardwareId: values['hardwareId'],
      hardwareName : values['hardwareName'],
      hardwareLogo : values['hardwareLogo'],
      hardwareFunction : values['hardwareFunction'],
      majorCategoryId : values.category['majorCategoryId'],
      minorCategoryId : values.category['minorCategoryId'],
      hardwareMode : values['hardwareMode'],
      hardwareProducer : values['hardwareProducer'],
      commType1: values['commType1'] ? 1 : 0,
      commType2: values['commType2'] ? 1 : 0,
      sdkType: values['sdkType'],
      os: values['os'],
      hardwarePlatform: values['hardwarePlatform'],
    }

    for(let key in params) {
      formData.append(key, params[key])
    }

    for(let v of values.tags) {
      formData.append("hardwareTags[]", v)
    }

    const url = getDomain(`web/hardware/addHardware/step1`)
    
    fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
      if(res.status == 200) {
        const hardwareId = res.data.hardwareId
        const firstStepValue = { ...values }

        this.setState({firstStepValue, hardwareId}, () => {
          this.props.toggleStep(2)
          this.props.updateFirstForm(values)
        })

      } else {
        debug.warn('请完善表单信息')
      }
    }).catch(e=>{
      debug.warn('网络错误')
    })
    
  }

  submitSecond(values) {
    const { firstStepValue, hardwareId } = this.state
    const SecondStepValues = {
      ...firstStepValue,
      ...values
    }

    const formData = new FormData()
    const params = {
      hardwareId : hardwareId,
      hardwareName : SecondStepValues['hardwareName'],
      hardwareLogo : SecondStepValues['hardwareLogo'],
      hardwareFunction : SecondStepValues['hardwareFunction'],
      majorCategoryId : SecondStepValues.category['majorCategoryId'],
      minorCategoryId : SecondStepValues.category['minorCategoryId'],
      hardwareMode: SecondStepValues['hardwareMode'],
      hardwareProducer: SecondStepValues['hardwareProducer'],
      commType1: SecondStepValues['commType1'] ? 1 : 0,
      commType2: SecondStepValues['commType2'] ? 1 : 0,
      sdkType: SecondStepValues['sdkType'],
      os: SecondStepValues['os'],
      hardwarePlatform: SecondStepValues['hardwarePlatform'],

      hardwareBrand: SecondStepValues['hardwareBrand'],
      hardwareDetail: SecondStepValues['hardwareDetail'],
      hardwareReport: SecondStepValues['hardwareReport'],
    }

    for(let key in params) {
      formData.append(key, params[key])
    }

    for(let key in SecondStepValues.hardwarePics) {
      formData.append("hardwarePics[]", SecondStepValues.hardwarePics[key])
    }

    const url = getDomain(`web/hardware/addHardware/step2`)

    fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(res=>{
      if(res.status == 200) {
        this.props.toggleStep(3)
      } else {
        debug.warn('请完善表单信息')
      }
    }).catch(e=>{
      debug.warn('网络错误')
    })

  }

  render() {
    const { page } = this.props.hdEdit

    const urls = {
      create: { url: `/hardware/create`, name: '发布新硬件' },
      list: { url: `/hardware/list`, name: '我的硬件' },
      doc: { url: `/hardware/doc` }
    }

    return (
      <div className="container clx">
        <Sidebar urls={urls} type="hardware"/>
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
    )
  }
}


const mapDispatchToProps = {
  toggleStep,
  getTags,
  getCates,
  getSdkInfo,
  getHDInfo,
  updateFirstForm
}

const mapStateToProps = ({ hdEdit }) => ({
  hdEdit
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
