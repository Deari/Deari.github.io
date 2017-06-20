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

  componentDidMount () {
    let hashName = location.hash && decodeURI(location.hash)
    let element = document.getElementsByName(hashName.slice(1))
    setTimeout(() => {
      element[0] && element[0].scrollIntoView()
    }, 1000)

    this.getDoc()
  }

  getDoc() {
    const docData = this.props === 'apps' ? appsDoc : widgetsDoc
    const url = getDomain('/bop/v1/document/69ff45051646671c69c56ce40a248ccd', { suffix: 'com' })
    fetchUtil.getJSON(url).then(data=>{
      console.log(data)
    }).catch(e=>{
      console.log(e)
    })
  }

  render () {
    const { type } = this.props
    const docData = type === 'apps' ? appsDoc : widgetsDoc
    const markdownData = transerMdToMarkdown(docData)
    const Doc = Toc(markdownData)
    
    return (
      <div className='container'>
        <SideBar pageLinks={getPageLinks(type)} type={type} content={Doc} />
        <div className={s['develop-file']}>
          <Markdown html={markdownData.html} />
        </div>
      </div>
    )
  }
}
