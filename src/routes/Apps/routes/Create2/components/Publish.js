import React from 'react'
import s from './H5-new.scss'

class Main extends React.Component {
  render () {
    return <div className={s['main-container']}>
      <h2 className={s['current-location']}>
        <a className="iconfont icon-fanhui" href="/apps/list"></a>
        <span className={s.site}>我的应用</span>
        创建新应用 ( H5 类型 )
      </h2>
    </div>
  }
}

export default Main;