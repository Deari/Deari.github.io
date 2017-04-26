import React from 'react'
import { Link } from 'react-router'
import { getApiDomain, getLoginDomain, getSourceVal } from 'utils/domain'
import { Markdown, transerMdToMarkdown, Toc } from 'components/Markdown'
import LoginSDK from 'utils/loginSDK'
import Sidebar from 'components/Sidebar'
import 'components/Header/Header'
import 'styles/_base.scss'

// Todo 从服务端获取 md 原文数据
import mdData from 'raw!./develop.md'

class Doc extends React.Component {

  state = {
    urls: {
      create: { url: `/apps/create`, name: '创建新应用' },
      list: { url: `/apps/list`, name: '我的应用' },
      doc: { url: `/apps/doc`, active: 'active'}
    }
  }

  componentDidMount() {
    let hashName = location.hash.slice(1);
    let element = document.getElementsByName(hashName);
    element && element[0] && element[0].scrollIntoView();
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
