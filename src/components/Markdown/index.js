import React, { Component } from 'react'
import marked, { Renderer } from 'marked'
import './github.scss'

marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

/**
 * 将md数据转换为 Toc 与 html
 * @param md: String
 * @returns {{html: String, tocList: Array}}
 */
export const transerMdToMarkdown = (md) => {

  const renderer = new Renderer()
  const tocList = []

  renderer.heading = function (text, level) {
    const escapedText = text.toLowerCase().replace(/[\s]+/g, '-')
    tocList.push({
      text, level
    })
    return `<h${level}><a name="${escapedText}" 
                          class="anchor" 
                          href="#${escapedText}">              
                       </a>${text}</h${level}>`
  }

  const html = marked(md, { renderer }, (err, result) => {
    return result
  })

  return {
    html,
    tocList
  }
}

export const Toc = ({ tocList }) => {
  return <ul>
    {tocList.map(toc => toc.level <= 5 && <li style={{ 'paddingLeft': (toc.level - 1) * 20 }}>
      <a href={`#${toc.text}`}>{toc.text}</a>
    </li>)}
  </ul>
}

Toc.defaultProps = {
  tocList: []
}

export const Markdown = ({ html }) => {
  return <div id="github" dangerouslySetInnerHTML={{ __html: html || '' }}/>
}

Markdown.defaultProps = {
  html: ''
}
