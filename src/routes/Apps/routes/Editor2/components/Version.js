import React from 'react'
import BreadCrumb from 'business/AppCreate/BreadCrumb'
import Tabs from 'business/AppCreate/Tabs'
import VersionForm from 'business/AppCreate/VersionForm'
import s from 'business/AppCreate/Basic-new.scss'
import { Link } from 'react-router'
import cx from 'classnames'

const Basic = (props) => {
  const { type, id, appType } = props;
  return <div className={s['edit-container']}>
    <div className={s.breadcrumb}>
      <a className="iconfont icon-fanhui" href="/apps/list"></a>
      <span className={s.site}>我的应用</span>
      <span className={`${s.site} ${s.noNext}`}>编辑应用 ( {appType} 类型 )</span>
    </div>
    <div className={s.tabs}>
      <ul className={s['tabs-titles']}>
        <li className="tabs-item"><Link className={s.address} to={`/apps/edit2/${type}/${id}/basic`}>基本信息</Link></li>
        <li className="tabs-item active"><Link className={s.address} to={`/apps/edit2/${type}/${id}/version`}>版本信息</Link></li>
      </ul>
    </div>
    <div className={s.main}>
      <span className={s.tips}>
        <i className="iconfont icon-zhuyi"></i>
        您的这次更新会在新的应用版本发布后，在应用市场上显示。
      </span>
      <VersionForm {...props}></VersionForm>
    </div>
  </div>
}

export default Basic;
