import React, { Component } from 'react'
import { Link } from 'react-router'
import s from './index-new.scss'
import cx from 'classnames'
import { PageTypes } from 'config/index'
import { appType } from 'config/index'

const TabelItem = ({ data, type }) => {

  return ( 
    <tr>
      <td className={s.imgWrap}><img src={data.appLogo} alt="LOGO"/></td>
      <td className={s.appInfo}>
        <span className={s.name}>{data.appName}</span>
        <i className={cx('iconfont', appType[data.appKind])}></i>
        <span className={s.desc}>{data.appDesc}</span>
        <Link className={s.link} to={`/${type}/detail/${data.appId}`}>在{PageTypes[type]}市场中查看<i className="iconfont icon-look"></i></Link>
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
        <h2 className={`${s['content-header']}`}><i className="iconfont icon-sidebar3"></i>{typeText}数据统计</h2>
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
            { Array.isArray(data) && data.length ?
              data.map((item, index) => <TabelItem key={index} type={type} data={item} />) 
              : <tr><td colSpan="7" style={{textAlign: 'center', padding: '30'}}>暂无数据</td></tr>
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table