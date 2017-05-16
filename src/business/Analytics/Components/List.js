import React, { Component } from 'react'
import SideBar from 'business/SideBar'
import Table from './ListTable'
import Pagination from 'components/Pagination'
import { PageTypes, getPageLinks } from 'config/index'
import s from './list-new.scss'

const List = (props) => {
  const { list, total, onPage, type } = props
  return (
    <div className={`container ${s.analytics}`} >
      <SideBar pageLinks={getPageLinks(type)} type={type}/>
      <div className="content">
        <Table data={list} type={type} typeText={PageTypes[type]} />
        <Pagination onChange={onPage} total={total} />
      </div>
    </div>
  )
}

export default List
