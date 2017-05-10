import React from 'react'
import s from './AppInfo-new.scss'

class AppInfo extends React.Component {

  render () {
    const { devKey, devSecret  } = this.props
    return (
      <div className={s.devInfo}>
        <h2 className={s.title}>开发密钥</h2>
        <div className={s.main}>
          <label htmlFor="" className={s.name}>DeveloperKey：</label>
          <span className={s.text}>{devKey}</span>
        </div>
        <div className={s.main}>
          <label htmlFor="" className={s.name}>DeveloperSecret: </label>
          <span className={s.text}>{devSecret}</span>
        </div>
      </div>
    )
  }
}

export default AppInfo