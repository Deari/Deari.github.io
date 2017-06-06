import React from 'react'
import { IndexLink, Link } from 'react-router'
import s from 'business/AppCreate/Basic-new.scss'

const Tab = ({ id }) => {
  return <div className={s.tabs}>
    <ul className={s.list}>
      <li className={s.item}>
        <IndexLink className={s.address}  activeClassName={s.active}
           to={`/widgets/edit/${id}`}>基本信息</IndexLink>
      </li>
      <li className={s.item} activeClassName='active'>
        <Link className={s.address}  activeClassName={s.active}
           to={`/widgets/edit/${id}/version`}>版本信息</Link>
      </li>
    </ul>
  </div>
}

export default Tab;
