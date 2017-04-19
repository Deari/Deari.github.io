import React from 'react'
import { Link } from 'react-router'
import AnchorList from './AnchorList'
import s from './index-new.scss'

const linkData = [{
  to: '/',
  label: '我的应用'
},{
  to: '/',
  label: '应用数据统计'
},{
  to: '/',
  label: '测试账号'
},{
  to: '/',
  label: '开发者文档'
}]

const CreateBtn = ({ icon, label}) => {
  return (
    <button className={s.createBtn}>
      <i className={icon}></i>
      <span>{label}</span>
    </button>
  )
}


const SideBar = () => {
  const BtnData = {
    icon: 'iconfont icon-create',
    label: '创建新组件'
  }

  return (
    <div className={s.sideBar}>
      <CreateBtn {...BtnData} />
      <AnchorList data={linkData} />
      <AnchorList data={linkData} style={{ marginTop: '30'}}/>
    </div>
  )
}

export default SideBar