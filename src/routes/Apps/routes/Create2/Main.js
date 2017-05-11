import React from 'react'
import { Link } from 'react-router'
import s from './index-new.scss'
import cx from 'classnames'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'

const Main = (props) => {
  const pageLinks = getPageLinks('apps').filter((item) => { return !item.hide })

  return <div className='container'>
    <SideBar pageLinks={pageLinks} type={'apps'} />
    <div className='sub-container'>
      {props.children}
    </div>
  </div>
}

export default Main
