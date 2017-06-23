import React from 'react'
import { Markdown, transerMdToMarkdown, Toc } from 'components/Markdown'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import s from './developfile-new.scss'
import fetchUtil from 'utils/fetch'
import {getDomain} from 'utils/d'
// Todo 从服务端获取 md 原文数据

import appsDoc from 'raw!./md/apps.md'
import widgetsDoc from 'raw!./md/widgets.md'

export default class Doc extends React.Component {
  state = {
    docData: '加载中...'
  }

  componentDidMount () {
    this.getDoc()
  }

  initViewPort() {
    let hashName = location.hash && decodeURI(location.hash)
    let element = document.getElementsByName(hashName.slice(1))
    element[0] && element[0].scrollIntoView()
  }

  getDoc() {
    const code = (this.props.type === 'apps' ? '应用开发' : '组件开发');
    const url = getDomain(`/bop/v1/document/${code}`, { suffix: 'com' })

    fetchUtil.getJSON(url, {}, { credentials: 'omit' }).then(data=>{
      this.setState({ docData: data.content })
    }).catch(e=>{
      console.log(e)
      const docData = this.props.type === 'apps' ? appsDoc : widgetsDoc
      this.setState({ docData: docData || '### 文件数据加载失败' })
    })
  }

  render () {
    const { type } = this.props
    const { docData } = this.state;
    const markdownData = transerMdToMarkdown(docData)
    const Doc = Toc(markdownData)
    
    return (
      <div className='container'>
        <SideBar pageLinks={getPageLinks(type)} type={type} content={Doc} />
        <div className={s['develop-file']}>
          <Markdown html={markdownData.html} initViewPort={::this.initViewPort} />
        </div>
      </div>
    )
  }
}
