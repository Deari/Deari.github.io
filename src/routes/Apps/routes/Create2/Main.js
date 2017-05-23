import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import s from 'business/AppCreate/Basic-new.scss'
import { APP_TYPES } from 'config/appTypes'

const Main = (props) => {
  const type = APP_TYPES[props.params.type];
  return <div className='container'>
    <SideBar pageLinks={getPageLinks('apps')} type={'apps'} />
    <div className='content'>
      <div className={s.breadcrumb}>
        <a className="iconfont icon-fanhui" href="/apps/list"></a>
        <span className={s.site}>我的应用</span>
        <span className={`${s.site} ${s.noNext}`}>创建新应用 ( {type && type.text}类型 )</span>
      </div>
      {props.children}
    </div>
  </div>
}

export default Main
