import React from 'react'
import { Link } from 'react-router'
import s from './index-new.scss'
import cx from 'classnames'
import { PageTypes } from 'config/index'
import { appType } from 'config/index'

const TabelItem = ({ data, type }) => {
  return (
    <tr>
      <td className={s.imgWrap}><img src={data.appLogo} alt='LOGO' /></td>
      <td className={s.appInfo}>
        <span className={s.name}>{data.appName}</span>
        <i className={cx('iconfont', appType[data.appKind])} />
        <span className={s.desc}>{data.appDesc}</span>
        <Link className={s.link} to={`/${type}/detail/${data.appId}`}>在{PageTypes[type]}市场中查看<i className='iconfont icon-look' /></Link>
      </td>
      <td className={s.day}>
        <span>昨天：<i className={s.num}>{data.storeCountNew}</i></span>
        <span className={s.yes}>前天：<i className={s.num}>{data.storeCountNewYesterday}</i></span>
      </td>
      <td className={s.day}>
        <span>昨天：<i className={s.num}>{data.activeStoreCount}</i></span>
        <span className={s.yes}>前天：<i className={s.num}>{data.activeStoreCountYesterday}</i></span>
      </td>
      <td className={s.day}>
        <span>昨天：<i className={s.num}>{data.launchCount}</i></span>
        <span className={s.yes}>前天：<i className={s.num}>{data.launchCountYesterday}</i></span>
      </td>
      <td className={s.day}>
        <span>昨天：<i className={s.num}>{data.downloadCount}</i></span>
        <span className={s.yes}>前天：<i className={s.num}>{data.downloadCountYesterday}</i></span>
      </td>
      <td className={s.actions}>
        <Link to={`/${type}/analytics/${data.statisticsId}`} className={`defaultBtn ${s.tableBtn}`}>查看</Link>
      </td>
    </tr>
  )
}

TabelItem.defaultProps = {
  data: {
    appLogo: '--',
    appName: '--',
    appDesc: '--',
    appId: '--'
  }
}

export default TabelItem