import React from 'react'
import { Link } from 'react-router'
import AnchorList from './AnchorList'
import s from './index-new.scss'
import { PageTypes } from 'config/index'

const SideBar = ({ pageLinks, tagLinks, type }) => {
  const toCreate = (type == 'hardware') ? `http://iotdev.ffan.net/zh-cn/developer/product/create` : `/${type}/create`
  return (
    <div className={s.sideBar}>
      <button className={s.createBtn}>
        <i className='iconfont icon-create'></i>
        <a href={toCreate}>{`创建新${PageTypes[type]}`}</a>
      </button>
      { pageLinks ? <AnchorList data={pageLinks} /> : null }
      { tagLinks ? <AnchorList data={tagLinks} style={{ marginTop: '30'}}/> : null }
    </div>
  )
}

export default SideBar