import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'

const Main = (props) => {
  return <div className='container'>
    <SideBar pageLinks={getPageLinks('widgets')} type={'widgets'} />
    <div className='content'>
      {props.children}
    </div>
  </div>
}

export default Main
