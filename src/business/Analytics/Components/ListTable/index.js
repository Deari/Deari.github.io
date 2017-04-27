import React, { Component } from 'react'
import { Link } from 'react-router'
import s from './index-new.scss'
import { PageTypes } from 'config/index'

const TabelItem = ({ data, type }) => {

  return ( 
    <tr>
      <td className={s.imgWrap}><img src={data.appLogo} alt="LOGO"/></td>
      <td className={s.appInfo}>
        <span className={`${s.name} ${s.textOverflow}`}>{data.appName}</span>
        <span className={s.desc}>{data.appDesc}</span>
        <Link className={s.link} to={`/${type}/detail/${data.appId}`}>在{PageTypes[type]}市场中查看<i className="iconfont icon-look"></i></Link>
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
        <Link to={`/${type}/analytics/${data.statisticsId}`} className={s.btn}>查看</Link>
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
    const { data, type, typeText } = this.props
    return (
      <div className={s.root}>
        <h2 className={s.title}><i className="iconfont icon-sidebar3"></i>{typeText}数据统计</h2>
        <table className={s.table} cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th>Logo</th>
              <th>{typeText}名称</th>
              <th>新增商家</th>
              <th>活跃商家</th>
              <th>启动次数</th>
              <th>下载次数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            { Array.isArray(data) &&
              data.map((item, index) => <TabelItem key={index} type={type} data={item} />) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table