import React from 'react'
import Pagination from 'components/Pagination'
import SideBar from 'business/SideBar'
import AppList from './Table'
import DevInfo from 'business/DevInfo'
import TabFilters from './TabFilters'
import { PageTypes, getPageLinks } from 'config/index'
import s from './index-new.scss'

export default class Main extends React.Component {
  render() {
    const { filter, data, type, total, onPagination, onToggleFilter, onSearch } = this.props;
    const app = data[0] || {
      developerKey: '',
      developerSecret: ''
    };

    const devinfo = {
      devKey: app.developerKey,
      devSecret: app.developerSecret
    }
    
    return (
      <div className="container">
        <SideBar pageLinks={getPageLinks(type)} type={type} />
        <div className={s.content}>
          <TabFilters filter={filter} type={type} onToggleFilter={onToggleFilter} onSearch={onSearch}/>
          <DevInfo {...devinfo} />
          <AppList data={data} type={type}/>
          <Pagination onChange={onPagination} total={total}/>
        </div>
      </div>
    )
  }
}