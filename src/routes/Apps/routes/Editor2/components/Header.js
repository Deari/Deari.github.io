import React from 'react'
import { Link } from 'react-router'
import s from 'business/AppCreate/Basic-new.scss'
import cx from 'classnames'
import { APP_TYPES } from 'config/appTypes'

const Header = (props) => {
  const { initialValues } = props;
  const { id } = props.params;
  const appType = Object.keys(APP_TYPES).find(v=>+APP_TYPES[v].value === +initialValues.appKind);

  return <div>
    <div className={s.breadcrumb}>
      <a className="iconfont icon-fanhui" href="/apps/list"></a>
      <span className={s.site}>我的应用</span>
      <span className={`${s.site} ${s.noNext}`}>编辑应用 ( {APP_TYPES[appType] && APP_TYPES[appType].text} 类型 )</span>
    </div>
    <div className={s.tabs}>
      <ul className={s['tabs-titles']}>
        <li className="tabs-item active"><Link className={s.address} to={`/apps/edit2/${id}/basic`}>基本信息</Link></li>
        <li className="tabs-item "><Link className={s.address} to={`/apps/edit2/${id}/version`}>版本信息</Link></li>
      </ul>
    </div>
  </div>
}

export default Header;