import React from 'react'
import s from './index-new.scss'

const Tags = ({ appType={} }) => {
	return (
    <div className={s.breadcrumb}>
      <a className="iconfont icon-fanhui" href="/apps/list"></a>
      <span className={s.site}>我的应用</span>
      <span className={`${s.site} ${s.noNext}`}>创建新应用 ( {appType.text} 类型 )</span>
    </div>
  )
}

export default Tags;