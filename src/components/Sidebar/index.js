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
        <li><i className="iconfont icon-application"></i>我的应用</li>
        <li><i className="iconfont icon-file"></i>应用文档</li>
      </ul>
      <ul className="tag-list">
        <li className="active"><i className="iconfont icon-label"></i>全部标签</li>
        <li><i className="iconfont icon-market-common"></i>营销常用</li>
        <li><i className="iconfont icon-member-management"></i>会员管理</li>
        <li><i className="iconfont icon-data-analysis"></i>数据分析</li>
        <li><i className="iconfont icon-trade"></i>交易应用</li>
        <li><i className="iconfont icon-pay"></i>支付系统</li>
        <li><i className="iconfont icon-logistics"></i>物流系统</li>
      </ul>
    </div>
  )
}
export default Sidebar
