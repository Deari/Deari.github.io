import React from 'react'

import '../../../../components/Header/Header'
import '../../../../styles/_base.scss'
import './index.scss'

import Content from './content'
import md from 'raw!./develop.md'

import marked, {Renderer} from 'marked'
var renderer = new Renderer();
var toc = []; // your table of contents as a list.
//https://github.com/ReactTraining/react-router/issues/394

marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

class Doc extends React.Component {
  render() {
    //const urls = {
    //  create: { url: `/apps/create` },
    //  list: { url: `/apps/list` },
    //  doc: { url: `/apps/doc`, active: true }
    //}

    const html = marked(md, {renderer})
    return (
    <div className="container clx">
      <div className='sidebar'>
        <a className="create-btn" href="/apps/create"><i className="iconfont icon-create"></i>创建新应用</a>
        <ul className="help-menu">
          <li><a className="" href=""><i className="iconfont icon-application"></i>我的应用</a></li>
          <li><a className="" href=""><i className="iconfont icon-file"></i>开发者文档</a></li>
        </ul>
        <ul className="tag-list">
          <li><a className="active"><i className="iconfont icon-sidebar0"></i>全部</a></li>
          <li><a className=""><i className="iconfont icon-sidebar1"></i>营销</a></li>
          <li><a className=""><i className="iconfont icon-sidebar2"></i>会员</a></li>
          <li><a className=""><i className="iconfont icon-sidebar3"></i>数据分析</a></li>
          <li><a className=""><i className="iconfont icon-sidebar4"></i>交易</a></li>
          <li><a className=""><i className="iconfont icon-sidebar5"></i>支付</a></li>
          <li><a className=""><i className="iconfont icon-sidebar6"></i>物流</a></li>
          <li><a className=""><i className="iconfont icon-sidebar7"></i>商品</a></li>
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
