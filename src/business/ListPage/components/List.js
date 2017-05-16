import React from 'react'
import Pagination from 'components/Pagination'
import SideBar from 'business/SideBar'
import AppList from './Table'
import DevInfo from 'business/DevInfo'
import TabFilters from './TabFilters'
import { PageTypes, getPageLinks } from 'config/index'
import s from './index-new.scss'

export default class Main extends React.Component {
  render () {
    const { filter, data, type, total, onPagination, onToggleFilter, onSearch } = this.props

    return (
      <div className='container'>
        <SideBar pageLinks={getPageLinks(type)} type={type} />
        <div className="content">
          <TabFilters filter={filter} type={type} onToggleFilter={onToggleFilter} onSearch={onSearch} />
          <DevInfo />
          <AppList data={data} type={type} />
          <Pagination onChange={onPagination} total={total} />
        </div>
      </div>
    )
  }
}
