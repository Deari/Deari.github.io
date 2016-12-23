import React from 'react'
import { IndexLink, Link } from 'react-router'
import '../../styles/_base.scss'
import '../../styles/iconfont/iconfont.css'
import './Sidebar.scss'

export const Sidebar = ({location, hideHeader}) => {
  return (
    <div className='sidebar'>
      <a><i></i>创建新组件</a>
      <ul>
        <li><i></i>我的应用</li>
        <li><i></i>应用文档</li>
      </ul>
      <ul>
        <li><i></i>全部标签</li>
        <li><i></i>营销常用</li>
        <li><i></i>会员管理</li>
        <li><i></i>数据分析</li>
        <li><i></i>交易应用</li>
        <li><i></i>支付系统</li>
        <li><i></i>物流系统</li>
      </ul>
    </div>
  )
}
export default Sidebar
