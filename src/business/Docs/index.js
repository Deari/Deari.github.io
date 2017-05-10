import React from 'react'
import { Markdown, transerMdToMarkdown, Toc } from 'components/Markdown'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import 'src/styles/v/var.scss'

// Todo 从服务端获取 md 原文数据

import appsDoc from 'raw!./md/apps.md'
import widgetsDoc from 'raw!./md/widgets.md'

export default class Doc extends React.Component {
  
  componentDidMount() {
    let hashName = location.hash && decodeURI(location.hash);
    let element = document.getElementsByName(hashName.slice(1));
    setTimeout(() => {
      element[0] && element[0].scrollIntoView();
    }, 1000)  
  }

  render() {
    const { type } = this.props
    const docData = type === 'apps' ? appsDoc : widgetsDoc;
    const markdownData = transerMdToMarkdown(docData)
    const Doc = Toc(markdownData)

    return (
      <div className="container">
        <SideBar pageLinks={getPageLinks(type)} type={type} content={Doc} />
        <div className="content">
          <Markdown html={markdownData.html}/>
        </div>
      </div>
    )
  }
}
