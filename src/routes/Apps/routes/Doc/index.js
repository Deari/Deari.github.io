import React from 'react'
import { Link } from 'react-router'
import { getApiUrl, getApiDomain, getLoginDomain } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import 'components/Header/Header'
import 'styles/_base.scss'
import {Markdown, transerMdToMarkdown, Toc} from 'components/Markdown'

// Todo 从服务端获取 md 原文数据
import mdData from 'raw!./develop.md'

class Doc extends React.Component {

  clickBtn(type) {
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login/`)
    let callbackUrl = `${location.host}/apps/${type}`
    
    LoginSDK.getStatus((status, data) => {
      if (status) window.location.href = `/apps/${type}`
    }, url, loginUrl, callbackUrl)
  }

  render() {
    const markdownData = transerMdToMarkdown(mdData)
    return (
      <div className="container clx">
        <div className='sidebar'>
          <a className="create-btn" onClick={this.clickBtn.bind(this, 'create')}><i className="iconfont icon-create"></i>发布新应用</a>
          <ul className="help-menu">
            <li><a onClick={this.clickBtn.bind(this, 'list')}><i className="iconfont icon-application"></i>我的应用</a></li>
            <li><Link to="/apps/doc" className="active"><i className="iconfont icon-file"></i>开发者文档</Link></li>
          </ul>
          <Toc tocList={markdownData.tocList} />
        </div>
        <div className="sub-container bg-white">
          <Markdown html={markdownData.html}/>
        </div>
      </div>
    )
  }
}

module.exports = ({
  path: 'doc',
  component: Doc
})
