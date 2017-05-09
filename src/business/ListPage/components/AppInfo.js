import React from 'react'
import s from './TabFilters-new.scss'
import cx from 'classnames'
import APPS_FILTERS from 'config/appStatus'
import Search from 'components/Search'

class Filters extends React.Component {

  render () {
    const {   } = this.props
    return (
      <div className={s.appInfo}>
        <h2>开发密钥</h2>
        <div>
          <label htmlFor="">DevelopKey</label>
          <span>111</span>
        </div>
        <div>
          <label htmlFor="">DevelopSecret</label>
          <span>222</span>
        </div>
      </div>
    )
  }
}

export default Filters