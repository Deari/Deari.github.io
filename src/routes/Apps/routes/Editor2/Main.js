import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import { APP_TYPES } from 'config/appTypes'
import s from 'business/AppCreate/Basic-new.scss'

const Main = (props) => {
  const { id, type } = props.params;
  const { text } = APP_TYPES[type] || {};

  return <div className='container'>
    <SideBar pageLinks={getPageLinks('apps')} type={'apps'} />
    <div className='content'>
      <div className={s.breadcrumb}>
        <a className="iconfont icon-fanhui" href="/apps/list"></a>
        <span className={s.site}>我的应用</span>
        <span className={`${s.site} ${s.noNext}`}>编辑应用 ( {text} 类型 )</span>
      </div>
      <div className={s.tabs}>
        <ul className={s.list}>
          <li className={s.item}>
            <Link className={s.address}  activeClassName={s.active} to={`/apps/edit2/${id}/basic`}>基本信息</Link>
          </li>
          <li className={s.item} activeClassName='active'>
            <Link className={s.address}  activeClassName={s.active} to={`/apps/edit2/${id}/version`}>版本信息</Link>
          </li>
        </ul>
      </div>
      <div className={s.main}>
        <span className={s.tips}>
          <i className="iconfont icon-zhuyi"></i>
          您的这次更新会在新的应用版本发布后，在应用市场上显示。
        </span>
        {props.children}
      </div>
    </div>
  </div>
}

export default Main
