import React from 'react'
import { IndexLink, Link } from 'react-router'
import cx from 'classnames'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import { APP_TYPES } from 'config/appTypes'
import s from 'business/AppCreate/Basic-new.scss'

const Main = (props) => {
  const { id, type } = props.params;
  const _type = APP_TYPES[type];
  
  let text;
  if(_type) {
    text = `(${type.text}类型)`;
  }

  return <div className='container'>
    <SideBar pageLinks={getPageLinks('apps')} type={'apps'} />
    <div className='content'>
      <div className={s.breadcrumb}>
        <a className="iconfont icon-fanhui" href="/apps/list"></a>
        <span className={s.site}>我的应用</span>
        <span className={`${s.site} ${s.noNext}`}>编辑应用 {text}</span>
      </div>
      <div className={s.tabs}>
        <ul className={s.list}>
          <li className={s.item}>
            <IndexLink className={s.address}  activeClassName={s.active} to={`/apps/edit/${id}`}>基本信息</IndexLink>
          </li>
          <li className={s.item} activeClassName='active'>
            <Link className={s.address}  activeClassName={s.active} to={`/apps/edit/${id}/version`}>版本信息</Link>
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
