import React, { Component } from 'react'
import SideBar from 'business/SideBar'
import s from './index-new.scss'
import cx from 'classnames'

class Analytics extends Component {

  render() {
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
              <div className={s.detailBox}>
                <img src="http://timg.ffan.com/convert/resize/url_T1kgDTBgYT1RCvBVdK/tfs/1.png" alt="" />
                <div className={s.info}>
                  <h2>会员管理</h2>
                  <div className={s.type}>
                    <i className={s.img}></i>
                    <span>极速数据 (企业)</span>
                  </div>
                  <h3 className={s.title}>内容提要</h3>
                  <p className={s.text}>会员管理应用，广泛应用于餐饮、美容美发、美甲、足浴等服务行业门店。
                    方便用户对客户进行有效管理和营销，并提供会员增长相关数据的统计分析。</p>
                </div>
              </div>

              <div className={s.yesterdayWrap}>
                <div className={s.yesterday}>
                  <h4 className={s.pageTitle}>昨日关键指标</h4>
                  <div className={s.list}>
                    <div className={s.item}>
                      <span className={s.name}>新增商家</span>
                      <span className={s.num}>0</span>
                    </div>
                    <div className={s.item}>
                      <span className={s.name}>活跃商家</span>
                      <span className={s.num}>0</span>
                    </div>
                    <div className={s.item}>
                      <span className={s.name}>启动次数</span>
                      <span className={s.num}>0</span>
                    </div>
                    <div className={s.item}>
                      <span className={s.name}>下载次数</span>
                      <span className={s.num}>0</span>
                    </div>
                  </div>
                </div>
                <div className={s.business}>
                  <h4 className={s.pageTitle}>累计商户</h4>
                  <span className={s.num}>0</span>
                </div>
              </div>

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

                <div className={s.tableWrap}>
                  <div className={s.pageTitle}>2017-04-06 至 2017-03-07 </div>
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
                      <tr>
                        <td>2017-04-06</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>2017-04-05</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Analytics
