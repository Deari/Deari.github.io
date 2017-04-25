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


const SideBar = ({ pageLinks, tagLinks, onTagClick }) => {
  const BtnData = {
    icon: 'iconfont icon-create',
    label: '创建新组件'
  }

  return (
    <div className={s.sideBar}>
      <CreateBtn {...BtnData} />
      { pageLinks ? <AnchorList data={getPageLinks(pageLinks)} /> : null }
      { tagLinks ? <AnchorList data={tagLinks} onTagClick={onTagClick} style={{ marginTop: '30'}}/> : null }
    </div>
  )
}

export default SideBar