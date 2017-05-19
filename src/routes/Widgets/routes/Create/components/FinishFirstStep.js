import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'

import './finishfirststep.scss'

const FinishFirstStep = props => {
  const { initialValues } = props
  const { developerKey, developerSecret, appLogo, appId, appName } = initialValues
  return (
    <div className='finish-first-step'>
      <div className='finish-success'>
        <p><i className='iconfont icon-finish' /><span>成功创建组件</span></p>
      </div>
      <div className='finish-apps-box'>
        {/* <h3 className="finish-apps">DeveloperKey 和 DeveloperSecret</h3> */}

        <div className='finish-apps-img'>
          <div className="apps-img"><img src={appLogo} /></div>
          <div className="apps-list">
          	<span className="apps-item">{appName}</span>
	          <span className="apps-item">AppID: {appId}</span>
	          <span className="apps-item">DeveloperKey: {developerKey}</span>
	          <span className="apps-item">DeveloperSecret: {developerSecret}</span>
          </div>
        </div>
        <dl className='finish-apps-text'>
          <dt>接下来你要做什么？</dt>
          <dd>1、你可以通过查看开发者文档，进行开发、调试，并将新版本准备好。(注：开发、调试时，需要上面的DeveloperKey和DeveloperSecret)</dd>
          <dd>2、新版本准备好之后，你可以在我的组件中发布新版本。</dd>
          <dd className='finish-apps-text-p'>返回我的组件,发布新版本。</dd>
        </dl>
        <p><Link className='finish-apps-text-link' to='/widgets/list'>查看我的组件</Link></p>
        <ul className='finish-apps-doc'>
          <li>
            <p>开发者必读</p>
            <Link to='/widgets/doc#开始前必读'>点击进入</Link>
          </li>
          <li>
            <p>IOS开发者文档</p>
            <Link to='/widgets/doc#iOS开发者'>点击进入</Link>
          </li>
          <li>
            <p>Android开发者文档</p>
            <Link to='/widgets/doc#Android开发者'>点击进入</Link>
          </li>
          <li>
            <p>HTML5开发者文档</p>
            <Link to='/widgets/doc#HTML5开发者'>点击进入</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  initialValues: state.widgetCreate.form2
})

export default connect(
  mapStateToProps,

)(reduxForm({
  form: 'finishFirstStep',
  fields: []
})(FinishFirstStep))
