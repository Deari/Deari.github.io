import React from 'react'

import '../../../../components/Header/Header'
import '../../../../styles/_base.scss'
import './index.scss'

import Content from './content'
import md from 'raw!./develop.md'

import marked, { Renderer } from 'marked'
const renderer = new Renderer()

const toc = []

const generateToc = tocList => {
  return <ul>
    {tocList.map(toc => toc.level <= 3 && <li style={{'paddingLeft': (toc.level-1) * 20}}>
      <a href={`#${toc.text}`}>{toc.text}</a>
    </li>)}
  </ul>
}

renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase().replace(/[\s]+/g, '-')
  toc.push({
    text, level
  })
  return `<h${level}><a name="${escapedText}" class="anchor" href="#${escapedText}">
<span class="header-link"></span></a>${text}</h${level}>`
}

marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

class Doc extends React.Component {
  render() {
    console.log('--------------')
    console.log(this.props)
    //const urls = {
    //  create: { url: `/apps/create` },
    //  list: { url: `/apps/list` },
    //  doc: { url: `/apps/doc`, active: true }
    //}

    const html = marked(md, { renderer }, (err, result) => {
      console.log(toc)
      return result
    })
    return (
      <div className="container clx">
        <div className='sidebar'>
          <a className="create-btn" href="/apps/create"><i className="iconfont icon-create"></i>创建新应用</a>
          <ul className="help-menu">
            <li><a className="" href=""><i className="iconfont icon-application"></i>我的应用</a></li>
            <li><a className="" href=""><i className="iconfont icon-file"></i>开发者文档</a></li>
          </ul>
          <ul className="tag-list">
            {generateToc(toc)}
          </ul>
        </div>
        <div className="sub-container bg-white">
          <Content html={html}/>
        </div>
      </div>
    )
  }
}

module.exports = ({
  path: 'doc',
  component: Doc
})
