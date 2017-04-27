import React, { Component } from 'react'
import cx from 'classnames'
import s from './index-new.scss'

import SideBar from 'business/SideBar'
import BasicInfo from './BasicInfo'
import YesterdayInfo from './YesterdayInfo'
import ChartView from './ChartView'
import { PageTypes, getPageLinks } from 'config/index'

const OverView = (props) => {
  const { basic, yesterday, chart, type, loadData } = props
  return (
    <div className={`container ${s.analytics}`} >
      <SideBar pageLinks={getPageLinks(type)} type={type} />
      <div className={s.content}>
        <div className={s.panels}>
          <div className={`${s.panel} ${s.active}`}>
            <BasicInfo {...basic} />
            <YesterdayInfo {...yesterday} />
            <ChartView data={chart} loadData={loadData}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverView
