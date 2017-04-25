import React, { Component } from 'react'
import SideBar from 'business/SideBar'
import Search from 'components/Search'
import Table from './ListTable'
import Pagination from 'components/Pagination'
import s from './list-new.scss'

const List = (props) => {
  const { list, total, pageTitle, onPage } = props;
  return (
    <div className={`container ${s.analytics}`} >
      <SideBar showPageLinks={true} />
      <div className={s.content}>
        {/*<Search onSearch={()=>}></Search>*/}
        <Table data={list} title={pageTitle}/>
        <Pagination style={{'textAlign': 'right'}} 
          onChange={onPage} total={total}
        />
      </div>
    </div>
  )
}

export default List