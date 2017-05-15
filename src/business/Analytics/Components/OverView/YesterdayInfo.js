import React from 'react'
import s from './index-new.scss'

const YesterdayInfo = (props) => {
  return (
    <div className={s.yesterdayWrap}>
      <div className={s.yesterday}>
        <h4 className={s.pageTitle}>昨日关键指标</h4>
        <div className={s.list}>
          <div className={s.item}>
            <span className={s.name}>新增商家</span>
            <span className={s.num}>{props.storeCountNew}</span>
          </div>
          <div className={s.item}>
            <span className={s.name}>活跃商家</span>
            <span className={s.num}>{props.activeStoreCount}</span>
          </div>
          <div className={s.item}>
            <span className={s.name}>启动次数</span>
            <span className={s.num}>{props.launchCount}</span>
          </div>
          <div className={s.item}>
            <span className={s.name}>下载次数</span>
            <span className={s.num}>{props.downloadCount}</span>
          </div>
        </div>
      </div>
      <div className={s.business}>
        <h4 className={s.pageTitle}>累计商户</h4>
        <span className={s.num}>{props.storeCountTotal}</span>
      </div>
    </div>
  )
}

export default YesterdayInfo
