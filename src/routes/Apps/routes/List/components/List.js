import React from 'react'
import Pagination from 'components/Pagination'
import SideBar from 'business/SideBar'
import List from './Table'
import TabFilters from './TabFilters'
import { PageTypes, getPageLinks } from 'config/index'
import s from './index-new.scss'

export default class AppsList extends React.Component {
  render() {
    const { filter, data, total, onPagination, onToggleFilter } = this.props;

    return (
      <div className="container">
        <SideBar pageLinks={getPageLinks('apps')} type='apps' />
        <div className={s.content}>
          <TabFilters filter={filter} onToggleFilter={onToggleFilter}/>
          <List data={data} type="apps"/>
          <Pagination onChange={onPagination} total={total}/>
        </div>
      </div>
    )
  }
}