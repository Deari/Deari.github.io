import React from 'react'
import { Link } from 'react-router'
import AnchorList from './AnchorList'
import s from './index-new.scss'
import { PageTypes } from 'config/index'

const SideBar = ({ pageLinks, tagLinks, type}) => {
  return (
    <div className={s.sideBar}>
      <button className={s.createBtn}>
        <i className='iconfont icon-create'></i>
        <Link to={`/${type}/create`}>{`创建新${PageTypes[type]}`}</Link>
      </button>
      { pageLinks ? <AnchorList data={pageLinks} /> : null }
      { tagLinks ? <AnchorList data={tagLinks} style={{ marginTop: '30'}}/> : null }
    </div>
  )
}

export default SideBar