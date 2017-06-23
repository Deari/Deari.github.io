import React from 'react'
import { Link } from 'react-router'
import AnchorList from './AnchorList'
import s from './index-new.scss'
import { PageTypes } from 'config/index'
import CreateBtn from './CreateBtn'

const SideBar = ({ pageLinks, tagLinks, createLink, type, content }) => {
  return (
    <div className={s.sideBar}>
      <CreateBtn type={type} />
      { pageLinks ? <AnchorList data={pageLinks} /> : null }
      { tagLinks ? <AnchorList data={tagLinks} style={{ marginTop: '30' }} /> : null }
      { content }
    </div>
  )
}

export default SideBar
