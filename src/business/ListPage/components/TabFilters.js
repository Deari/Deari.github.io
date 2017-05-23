import React from 'react'
import s from './TabFilters-new.scss'
import cx from 'classnames'
import APPS_FILTERS from 'config/appStatus'
import { PageTypes } from 'config/index'
import Search from 'components/Search'

class Filters extends React.Component {
  render () {
    const { filter, onToggleFilter, onSearch, type, searchText } = this.props
    return (
      <div className={`tabs ${s.statusBar}`}>
        <ul className={`tabs-titles ${s.navFilters}`}>
          {APPS_FILTERS.map(item => <li className={cx('tabs-item',{ 'active': item.filter === filter })}
            onClick={() => { onToggleFilter(item) }}
          >
            {item.text}
          </li>)}
        </ul>
        <Search defaultValue={searchText} onClear={onSearch} onSearch={onSearch} placeholder={`搜索我的${PageTypes[type]}`} />
      </div>
    )
  }
}

export default Filters
