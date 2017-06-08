import React from 'react'
import { IndexLink, Link } from 'react-router'
import s from 'business/AppCreate/Basic-new.scss'

const Breadcrumb = ({ typeText }) => {
  return <div className={s.breadcrumb}>
    <Link className="iconfont icon-fanhui" href="/apps/list"></Link>
    <span className={s.site}>我的应用</span>
    <span className={`${s.site} ${s.noNext}`}>编辑应用（{typeText}类型）</span>
  </div>
}

export default Breadcrumb;
