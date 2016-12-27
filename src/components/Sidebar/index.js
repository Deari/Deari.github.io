import React from 'react'
import { IndexLink, Link } from 'react-router'
import '../../styles/_base.scss'
import '../../styles/iconfont/iconfont.css'
import './Sidebar.scss'

export const Sidebar = ({location, hideHeader}) => {
  return (
    <div className='sidebar'>
      <a className="create-btn"><i className="iconfont icon-create"></i>创建新组件</a>
      <ul className="help-menu">
        <li><a className="active"><i className="iconfont icon-application"></i>我的应用</a></li>
        <li><a><i className="iconfont icon-file"></i>应用文档</a></li>
      </ul>
      <ul className="tag-list">
        <li><a><i className="iconfont icon-sidebar0"></i>全部标签</a></li>
        <li><a><i className="iconfont icon-sidebar7"></i>营销常用</a></li>
        <li><a><i className="iconfont icon-sidebar1"></i>会员管理</a></li>
        <li><a><i className="iconfont icon-sidebar2"></i>数据分析</a></li>
        <li><a><i className="iconfont icon-sidebar3"></i>交易应用</a></li>
        <li><a><i className="iconfont icon-sidebar4"></i>支付系统</a></li>
        <li><a><i className="iconfont icon-sidebar5"></i>物流系统</a></li>
      </ul>
    </div>
  )
}
export default Sidebar
