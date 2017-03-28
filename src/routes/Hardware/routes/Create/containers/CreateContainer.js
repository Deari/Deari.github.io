import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { test } from '../modules/create'

import Sidebar from 'components/Sidebar'
import FirstStep from '../components/FirstStepForm'
import SecondStep from '../components/SecondStepForm'
import Complete from '../../../components/Complete'
import Step from '../../../components/Step'

import { getDomain, getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import fetchUtil from 'utils/fetchUtil'

import { toggleStep, getTags, getCates, getSdkInfo, updateFirstForm } from '../modules/create'

import debug from 'utils/debug'

class CreateContainer extends Component {

  state = {
    firstStepValue: '',
    hardwareId: ''
  }

  componentWillMount() {
    let sourceVal = getSourceVal()
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = location.href

    LoginSDK.getStatus((status, data) => {
      if (status) {
        this.props.toggleStep(1)
        this.props.getTags()
        this.props.getCates()
        this.props.getSdkInfo()
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
    let callbackUrl = `${location.origin}/hardware/list`

    LoginSDK.getStatus((status, data) => {
      if (status) {

        const formData = new FormData()

        const params = {
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

        fetchUtil.postJSON(url, formData, { jsonStringify: false}).then(
          res => {
            if(res.status == 200) {
              const hardwareId = res.data.hardwareId
              const firstStepValue = { ...values }

              this.setState({firstStepValue, hardwareId}, () => {
                this.props.updateFirstForm(values)
                this.props.toggleStep(2)
              })

            } else {
              debug.warn('请完善表单信息')
            }
          }).catch(e => {
            console.log("e ", e)
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
    let callbackUrl = `${location.origin}/hardware/list`

    LoginSDK.getStatus((status, data) => {
      if (status) {

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

        for(let v of SecondStepValues.tags) {
          formData.append("hardwareTags[]", v)
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
          console.log('网络错误', e)
        })

      } else {
        debug.warn("请先登录")
      }
    }, sessionUrl, loginUrl, callbackUrl)


  }

  render() {
    const { page } = this.props.hardwareCreate

    const urls = {
      create: { url: `/hardware/create`, name: '创建新硬件' },
      list: { url: `/hardware/list`, name: '我的硬件' },
      doc: { url: `/hardware/doc` }
    }

    return (
      <div className="container clx">
        <Sidebar urls={urls} type="hardware"/>
        <div className="sub-container">
          <Step page={page}/>
          {
            page === 1 && <FirstStep onSubmit={::this.submitFirst}/>
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
  updateFirstForm
}

const mapStateToProps = ({ hardwareCreate }) => ({
  hardwareCreate
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
