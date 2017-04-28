import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import s from './index-new.scss'
import TableView from './TableView'
import cx from 'classnames'

class ChartView extends React.Component {
  state = {
    selectDays: [7, 15, 30],
    days: 7
  }

  showDaysData (days) {
    this.props.loadData(days)
    this.setState({ days })
  }

  render () {
    const { data, loadData } = this.props
    const { days, selectDays } = this.state
    const startDate = data[0] ? data[0].statisticsTime : '--'
    const endDate = data[data.length-1] ? data[data.length-1].statisticsTime : '--'

    return (
      <div className={s.chart}>
        <div className={s.title}>
          <ul className={s.list}>
            { selectDays.map((v)=>{
              return <li key ={v} className={cx({ [s.active]: days === v })} 
              onClick={this.showDaysData.bind(this, v)}>最近{v}天</li>
            })}
          </ul>
        </div>
        <div className={s.charContent}>
          <h4 className={s.pageTitle}>{startDate} 至 {endDate}</h4>
          <div className={s.chartCanvas}>
            <LineChart width={840} height={320} data={ data }
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="_day"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip itemStyle={{fontSize: 12}}/>
              <Legend verticalAlign="top" height={36}/>
              <Line name="启动次数" type="monotone" dataKey="launchCount" stroke="#8884d8" />
              <Line name="新增商家" type="monotone" dataKey="storeCountNew" stroke="#82ca9d" />
              <Line name="活跃商家" type="monotone" dataKey="activeStoreCount" stroke="#42c79d" />
              <Line name="下载次数" type="monotone" dataKey="downloadCount" stroke="#89aa6d" />
            </LineChart>
          </div>
        </div>

        <div className={s.tableWrap}>
          <div className={s.pageTitle}>{startDate} 至 {endDate}</div>
          <table className={s.table}>
            <thead>
              <tr>
                <th>时间</th>
                <th>新增商家</th>
                <th>活跃商家</th>
                <th>启动次数</th>
                <th>下载次数</th>
              </tr>
            </thead>
            <tbody>
              { Array.isArray(data) && data.map((item, key) => {
                return <tr>
                  <td>{item.statisticsTime}</td>
                  <td>{item.storeCountNew}</td>
                  <td>{item.activeStoreCount}</td>
                  <td>{item.launchCount}</td>
                  <td>{item.downloadCount}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div >
      </div>
    )
  }
}

export default ChartView