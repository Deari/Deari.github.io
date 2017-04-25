import React from 'react'
import { Link } from 'react-router'
import AnchorList from './AnchorList'
import s from './index-new.scss'
import { getPageLinks } from 'config/sidebar'

const CreateBtn = ({ icon, label}) => {
  return (
    <button className={s.createBtn}>
      <i className={icon}></i>
      <span>{label}</span>
    </button>
  )
}


const SideBar = ({ showPageLinks, showTagLinks }) => {
  const BtnData = {
    icon: 'iconfont icon-create',
    label: '创建新组件'
  }
  const pageLinks = getPageLinks()

  return (
    <div className={s.sideBar}>
      <CreateBtn {...BtnData} />
      { showPageLinks ? <AnchorList data={pageLinks} /> : null }
      { showTagLinks ? <AnchorList data={[]} style={{ marginTop: '30'}}/> : null }
    </div>
  )
}

export default SideBar