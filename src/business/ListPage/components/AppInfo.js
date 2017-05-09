import React from 'react'
import s from './TabFilters-new.scss'

class AppInfo extends React.Component {

  render () {
    const { devKey, devSecret  } = this.props
    return (
      <div className={s.devInfo}>
        <h2>开发密钥</h2>
        <div>
          <label htmlFor="">DevelopKey：</label>
          <span>{devKey}</span>
        </div>
        <div>
          <label htmlFor="">DevelopSecret: </label>
          <span>{devSecret}</span>
        </div>
      </div>
    )
  }
}

export default AppInfo