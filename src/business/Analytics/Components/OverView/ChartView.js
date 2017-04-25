import React from 'react'
import s from './index-new.scss'
import TableView from './TableView'
import cx from 'classnames'

const ChartView = () => {
  return (
    <div className={s.chart}>
      <div className={s.title}>
        <ul className={s.list}>
          <li className={cx(s.active)}>最近30天</li>
          <li>最近15天</li>
          <li>最近7天</li>
        </ul>
        <ul className={s.list}>
          <li className={cx(s.active)}>新增商家</li>
          <li>活跃商家</li>
          <li>启动次数</li>
          <li>下载次数</li>
        </ul>
      </div>
      <div className={s.charContent}>
        <h4 className={s.pageTitle}>2017-03-07 至 2017-04-04</h4>
        <div className={s.chartCanvas}>这里是图表</div>
      </div>
      <TableView></TableView>
    </div>
  )
}

export default ChartView