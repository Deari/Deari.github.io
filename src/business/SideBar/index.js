import React from 'react'
import { Link } from 'react-router'
import AnchorList from './AnchorList'
import s from './index-new.scss'
import { PageTypes } from 'config/index'

const SideBar = ({ pageLinks, tagLinks, type, onTagClick }) => {
  return (
    <div className={s.sideBar}>
      <button className={s.createBtn}>
        <i className='iconfont icon-create'></i>
        <span>{`创建新${PageTypes[type]}`}</span>
      </button>
      { pageLinks ? <AnchorList data={pageLinks} /> : null }
      { tagLinks ? <AnchorList data={tagLinks} onTagClick={onTagClick} style={{ marginTop: '30'}}/> : null }
    </div>
  )
}

export default SideBar