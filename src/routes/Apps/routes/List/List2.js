import React from 'react'
import { Link } from 'react-router'
import Pagination from 'components/Pagination'
import fetchUtil from 'utils/fetch'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import s from './index-new.scss'


export default class AppsList extends React.Component {

  componentDidMount() {
    console.log("did mount")
  }

  render() {
    return (
      <div className="container">
        <SideBar pageLinks={getPageLinks('apps')} type='apps' />
        <div className={s.content}>
          hello
        </div>
      </div>
    )
  }
}