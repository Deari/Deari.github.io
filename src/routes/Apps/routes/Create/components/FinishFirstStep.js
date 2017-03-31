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
      <div className="finish-success">
        <p><i className="iconfont icon-finish"></i><span>成功创建应用</span></p>
      </div>
      <div className="finish-apps-box">
        <h3 className="finish-apps">AppID 和 AppKEY</h3>
        <dl className="finish-apps-img">
          <dt><img src={appLogo} /></dt>
          <dd>AppID: {appId}</dd>
          <dd>AppKEY: {appKey}</dd>
        </dl>
        <dl className="finish-apps-text">
          <dt>接下来你要做什么？</dt>
          <dd>1、你可以通过查看开发者文档，进行开发、调试，并将新版本准备好。(注：开发、调试时，需要上面的AppID和AppKEY)</dd>
          <dd>2、新版本准备好之后，你可以在我的应用中发布新版本。</dd>
          <dd className="finish-apps-text-p">返回我的应用,发布新版本。</dd>
        </dl>
        <p><Link className="finish-apps-text-link" to="/apps/list">查看我的应用</Link></p>
        <ul className="finish-apps-doc">
          <li>
            <p>开发者必读</p>
            <span>点击进入</span>
          </li>
          <li>
            <p>ios开发者文档</p>
            <span>点击进入</span>
          </li>
          <li>
            <p>Android开发者文档</p>
            <span>点击进入</span>
          </li>
          <li>
            <p>HTML5开发者文档</p>
            <span>点击进入</span>
          </li>
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



