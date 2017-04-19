import React, { Component } from 'react'
import s from './index-new.scss'

class Table extends Component {
  
  render() {
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
            <tr>
              <td className={s.imgWrap}><img src="x" alt="LOGO"/></td>
              <td className={s.appInfo}>
                <span className={s.name}>会员管理</span>
                <span className={s.desc}>全国30多个省市县的邮编号码查询，数据权威准确，数百万条数据, 全国30多个省市县的邮编号码查询，数据权威准确，数百万条数据</span>
                <span className={s.link}>在 应用市场 中查看<i className="iconfont icon-look"></i></span>
              </td>
              <td className={s.common}>
                <span>今：<i className={s.num}>2</i></span>
                <span>昨：<i className={s.num}>2</i></span>
              </td>
              <td className={s.common}>
                <span>今：<i className={s.num}>2</i></span>
                <span>昨：<i className={s.num}>2</i></span>
              </td>
              <td className={s.common}>
                <span>今：<i className={s.num}>2</i></span>
                <span>昨：<i className={s.num}>2</i></span>
              </td>
              <td className={s.common}>
                <span>今：<i className={s.num}>2</i></span>
                <span>昨：<i className={s.num}>2</i></span>
              </td>
              <td className={s.actions}>
                <span className={s.btn}>查看</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table