import React from 'react'
import { Link } from 'react-router'
import { getApiDomain, getLoginDomain, getSourceVal } from 'utils/domain'
import {Markdown, transerMdToMarkdown, Toc} from 'components/Markdown'
import LoginSDK from 'utils/loginSDK'
import Sidebar from 'components/Sidebar'
import 'components/Header/Header'
import 'styles/_base.scss'
import './index.scss'

// Todo 从服务端获取 md 原文数据
import mdData from 'raw!./develop.md'

class Doc extends React.Component {

  state = {
    urls: {
      create: { url: `/hardware/create`, name: '发布新硬件' },
      list: { url: `/hardware/list`, name: '我的硬件' },
      doc: { url: `/hardware/doc`, active: 'active'}
    }
  }

  render() {

    const { urls } = this.state
    const markdownData = transerMdToMarkdown(mdData)

    return (
      <div className="container clx">
        <Sidebar urls={urls} tocList={markdownData.tocList} bottomComponent={Toc} />
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
