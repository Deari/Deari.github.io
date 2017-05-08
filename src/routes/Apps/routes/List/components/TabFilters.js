import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'
import APPS_FILTERS from '../config'

class Filters extends React.Component {

  render () {
    const { filter, onToggleFilter } = this.props
    return (
      <div className={s.statusBar}>
        <ul className={s.navFilters}>
          {APPS_FILTERS.map(item=> <li className={cx({ [s.active]: item.filter === filter })}
            onClick={()=>{ onToggleFilter(item) }}
          >
            {item.text}
          </li>)}
        </ul> 
      </div>
    )
  }
}

export default Filters