import React, { Component } from 'react'
import s from './index-new.scss'

const TabelItem = ({ data }) => {
  return ( 
    <tr>
      <td className={s.imgWrap}><img src="x" alt="LOGO"/></td>
      <td className={s.appInfo}>
        <span className={s.name}>{data.appName}</span>
        <span className={s.desc}>{data.appDesc}</span>
        <span className={s.link}>在 应用市场 中查看<i className="iconfont icon-look"></i></span>
      </td>
      <td className={s.common}>
        <span>今：<i className={s.num}>{data.new[0]}</i></span>
        <span>昨：<i className={s.num}>{data.new[1]}</i></span>
      </td>
      <td className={s.common}>
        <span>今：<i className={s.num}>{data.active[0]}</i></span>
        <span>昨：<i className={s.num}>{data.active[1]}</i></span>
      </td>
      <td className={s.common}>
        <span>今：<i className={s.num}>{data.launch[0]}</i></span>
        <span>昨：<i className={s.num}>{data.launch[1]}</i></span>
      </td>
      <td className={s.common}>
        <span>今：<i className={s.num}>{data.download[0]}</i></span>
        <span>昨：<i className={s.num}>{data.download[1]}</i></span>
      </td>
      <td className={s.actions}>
        <span className={s.btn}>查看</span>
      </td>
    </tr>
  )
}

TabelItem.defaultProps = {
  data: {
    appName: '--',
    appDesc: '--',
    aooId: '--',
    new: [0,0],
    launch: [0,0],
    download: [0,0],
    active: [0,0]
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
              data.map((item, index) => <TabelItem key={index} />) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table