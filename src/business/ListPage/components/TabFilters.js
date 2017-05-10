import React from 'react'
import s from './TabFilters-new.scss'
import cx from 'classnames'
import APPS_FILTERS from 'config/appStatus'

import Search from 'components/Search'

class Filters extends React.Component {

  render () {
    const { filter, onToggleFilter, onSearch } = this.props
    return (
      <div className={`${s['content-header']} ${s.statusBar}`}>
        <ul className={s.navFilters}>
          {APPS_FILTERS.map(item=> <li className={cx({ [s.active]: item.filter === filter })}
            onClick={()=>{ onToggleFilter(item) }}
          >
            {item.text}
          </li>)}
        </ul> 
        <Search onSearch={onSearch} placeholder='查找'></Search>
      </div>
    )
  }
}

export default Filters