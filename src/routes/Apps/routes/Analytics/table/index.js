import React, { Component } from 'react'
import { Link } from 'react-router'
import s from './index-new.scss'

const TabelItem = ({ data }) => {
  return ( 
    <tr>
      <td className={s.imgWrap}><img src={data.appLogo} alt="LOGO"/></td>
      <td className={s.appInfo}>
        <span className={s.name}>{data.appName}</span>
        <span className={s.desc}>{data.appDesc}</span>
        <span className={s.link}>在 应用市场 中查看<i className="iconfont icon-look"></i></span>
      </td>
      <td className={s.common}>
        <span>今：<i className={s.num}>{data.storeCountNew}</i></span>
        <span>昨：<i className={s.num}>{data.storeCountNewYesterday}</i></span>
      </td>
      <td className={s.common}>
        <span>今：<i className={s.num}>{data.activeStoreCount}</i></span>
        <span>昨：<i className={s.num}>{data.activeStoreCountYesterday}</i></span>
      </td>
      <td className={s.common}>
        <span>今：<i className={s.num}>{data.launchCount}</i></span>
        <span>昨：<i className={s.num}>{data.launchCountYesterday}</i></span>
      </td>
      <td className={s.common}>
        <span>今：<i className={s.num}>{data.downloadCount}</i></span>
        <span>昨：<i className={s.num}>{data.downloadCountYesterday}</i></span>
      </td>
      <td className={s.actions}>
        <Link to={`/apps/analytics/${data.appId}`} className={s.btn}>查看</Link>
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

class Table extends Component {
  
  render() {
    const { data } = this.props
    return (
     <div className={s.panel}>
        <h2 className={s.title}><i className="iconfont icon-data-count"></i>应用数据统计</h2>
        <table className={s.table} cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th>Logo</th>
              <th>应用名称</th>
              <th>新增商家</th>
              <th>活跃商家</th>
              <th>启动次数</th>
              <th>下载次数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            { Array.isArray(data) &&
              data.map((item, index) => <TabelItem key={index} data={item} />) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table