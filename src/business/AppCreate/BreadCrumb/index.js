import React from 'react'
import s from './index-new.scss'
import { PageTypes } from 'config/index'

const Tags = ({ appType, type }) => {
	return (
    <div className={s.breadcrumb}>
      <a className="iconfont icon-fanhui" href="/apps/list"></a>
      <span className={s.site}>我的{PageTypes[type]}</span>
      <span className={`${s.site} ${s.noNext}`}>创建新{PageTypes[type]} ( {appType} 类型 )</span>
    </div>
  )
}

export default Tags;