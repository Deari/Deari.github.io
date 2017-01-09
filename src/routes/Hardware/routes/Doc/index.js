import React from 'react'

import '../../../../components/Header/Header'
import '../../../../styles/_base.scss'
import {Markdown, transerMdToMarkdown, Toc} from 'components/Markdown'

// Todo 从服务端获取 md 原文数据
import mdData from 'raw!./develop.md'

class Doc extends React.Component {
  render() {
    const markdownData = transerMdToMarkdown(mdData)
    return (
      <div className="container clx">
        <div className='sidebar'>
          <a className="create-btn" href="/apps/create"><i className="iconfont icon-create"></i>创建新硬件</a>
          <ul className="help-menu">
            <li><a href="/hardware/list"><i className="iconfont icon-application"></i>我的硬件</a></li>
            <li><a href="/hardware/doc"><i className="iconfont icon-file"></i>开发者文档</a></li>
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
