import React from 'react'
import { IndexLink, Link } from 'react-router'
import s from 'business/AppCreate/Basic-new.scss'

const Breadcrumb = ({ typeText }) => {
  return <div className={s.breadcrumb}>
    <Link className="iconfont icon-fanhui" href="/widgets/list"></Link>
    <span className={s.site}>我的组件</span>
    <span className={`${s.site} ${s.noNext}`}>编辑组件（{typeText}类型）</span>
  </div>
}

export default Breadcrumb;
