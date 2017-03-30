import React, { Component, PropTypes } from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'

import './finishfirststep.scss'

const FinishFirstStep = props => {
  const { initialValues } = props
  const { appId, appKey, appLogo } = initialValues
  return (
    <div className="finish-first-step">
      <div className="finish-btn">
        <a><i className="iconfont icon-radio"></i>成功创建应用</a>
      </div>
      <div className="finish-apps-box">
        <dl className="finish-apps">
          <dt>AppID 和 AppKEY</dt>
          <dd>您已经成功创建了新应用</dd>
          <dd>并得到了AppID和AppKEY</dd>
        </dl>
        <dl className="finish-apps-img">
          <dt><img src={appLogo} /></dt>
          <dd className="finish-apps-img-tittle">四十五</dd>
          <dd>AppID: {appId}</dd>
          <dd>AppKEY: {appKey}</dd>
        </dl>
        <dl className="finish-apps-text">
          <dt>接下来你要做什么？</dt>
          <dd>1、你可以通过查看开发者文档，进行开发、调试，并将新版本准备好。(注：开发、调试时，需要上面的AppID和AppKEY)</dd>
          <dd>2、新版本准备好之后，你可以在<Link className="finish-apps-text-link" to="/apps/list">我的应用</Link>中发布新版本。</dd>
        </dl>
        <ul className="finish-apps-doc">
          <li><a><i></i>开发者必读</a></li>
          <li><a><i></i>Android开发者文档</a></li>
          <li><a><i></i>ios开发者文档</a></li>
          <li><a><i></i>HTML开发者文档</a></li>
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = ({appsCreate}) => ({
  initialValues: appsCreate.form2,
})

export default connect(
  mapStateToProps,

)(reduxForm({
  form: 'finishFirstStep',
  fields: [],
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(FinishFirstStep))



