import React, { Component } from 'react'
import SideBar from 'business/SideBar'
import s from './index-new.scss'
import cx from 'classnames'
import fetchUtil from 'utils/fetch'
import { getEnvDomain } from 'utils/d'

import BasicInfo from './BasicInfo'
import YesterdayInfo from './YesterdayInfo'
import ChartView from './ChartView'

import TEST_DATA from './data'

class Analytics extends Component {
  
  state = {
    basic: {},
    yesterday: {},
    chart: {}
  }

  componentDidMount() {
    const { id } = this.props
    const url = getEnvDomain()+`/app/v1/bo/v1/web/developer/statistics/app/${id}`;
    fetchUtil.getJSON(url, {}).then(data=> {
      this.setState({
        basic: data.yesterday,
        yesterday: data.yesterday,
        chart: data.list
      })
    }).catch(e=>{
      console.warn(e);
    })
  }

  render() {
    const { basic, yesterday, chart } = this.state
    return (
      <div className={`container ${s.analytics}`} >
        <SideBar></SideBar>
        <div className={s.content}>
          <div className={s.header}>
            <span className={s.back}><i className="iconfont icon-leftarrow"></i>返回</span>
            <ul className={s.tabList}>
              <li className={s.active}>概况</li>
              <li>版本分布</li>
            </ul>
          </div>    
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
}

export default Analytics
