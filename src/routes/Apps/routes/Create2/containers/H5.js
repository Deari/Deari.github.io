import React from 'react'
import { Link } from 'react-router'
import s from '../index-new.scss'
import cx from 'classnames'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'

const Main = () => {

  const pageLinks = getPageLinks('apps').filter(( item ) => { return !item.hide })

  return <div>hello h5creator.</div>
}

export default {
  path: 'h5',
  component: Main
};
