import React from 'react'
import s from 'business/AppCreate/Basic-new.scss'
import { IndexLink, Link } from 'react-router'
import VersionForm from '../containers/VersionFormContainer'

const Version = (props) => {
  const { id, type } = props.params;
  
  return <div>
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
      <VersionForm {...props}></VersionForm>
    </div>
  </div>
}

export default Version;