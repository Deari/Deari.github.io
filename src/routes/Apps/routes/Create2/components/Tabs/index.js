import React from 'react'
import t from './index-new.scss'
import { Link } from 'react-router'
import cx from 'classnames'

const Tags = ({ appType={} }) => {
	return (
    <div className={t.tabs}>
      <ul className={t['tabs-titles']}>
        <li className="tabs-item"><Link className={t.address} to='/apps/create2/h5'>基本信息</Link></li>
        <li className={cx("tabs-item","active")}><Link className={t.address} to='/apps/create2/h5/version'>版本信息</Link></li>
      </ul>
    </div>
  )
}

export default Tags;