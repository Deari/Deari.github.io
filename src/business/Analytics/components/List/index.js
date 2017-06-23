import React, { Component } from 'react'
import SideBar from 'business/SideBar'
import Table from './Table'
import Pagination from 'components/Pagination'
import { getPageLinks } from 'config/index'

const List = (props) => {
  const { list, total, onPage, type } = props
  return (
    <div className="container">
      <SideBar pageLinks={getPageLinks(type)} type={type}/>
      <div className="content">
        <Table data={list} />
        <Pagination onChange={onPage} total={total} />
      </div>
    </div>
  )
}

export default List
