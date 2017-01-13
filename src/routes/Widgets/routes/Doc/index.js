import React from 'react'
import { Link } from 'react-router'
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
          <Link className="create-btn" to="/widgets/create"><i className="iconfont icon-create"></i>发布新组件</Link>
          <ul className="help-menu">
            <li><Link to="/widgets/list"><i className="iconfont icon-application"></i>我的组件</Link></li>
            <li><Link to="/widgets/doc" className="active"><i className="iconfont icon-file"></i>开发者文档</Link></li>
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