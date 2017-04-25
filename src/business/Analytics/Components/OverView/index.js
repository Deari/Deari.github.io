import React, { Component } from 'react'
import cx from 'classnames'
import s from './index-new.scss'

import SideBar from 'business/SideBar'

import BasicInfo from './BasicInfo'
import YesterdayInfo from './YesterdayInfo'
import ChartView from './ChartView'

const OverView = (props) => {
  const { basic, yesterday, chart } = props
  return (
    <div className={`container ${s.analytics}`} >
      <SideBar pageLinks={'app'}></SideBar>
      <div className={s.content}>
        {/*<div className={s.header}>
          <span className={s.back}><i className="iconfont icon-leftarrow"></i>返回</span>
          <ul className={s.tabList}>
            <li className={s.active}>概况</li>
            <li>版本分布</li>
          </ul>
        </div>    */}
        <div className={s.panels}>
          <div className={`${s.panel} ${s.active}`}>
            <BasicInfo {...basic} />
            <YesterdayInfo {...yesterday} />
            <ChartView data={chart} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverView
