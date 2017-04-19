import React, { Component } from 'react'
import s from './index-new.scss'

class Table extends Component {
  
  render() {
    return (
     <div class="panel">
        <h2><i class="iconfont icon-data-count"></i>应用数据统计</h2>
        <table cellspacing="0" cellpadding="0">
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
              <td><img src="x" alt="LOGO"/></td>
              <td>
                <div>
                  <span>会员管理</span>
                  <span>全国30多个省市县的邮编号码查询，数据权威准确，数百万条数据, 全国30多个省市县的邮编号码查询，数据权威准确，数百万条数据</span>
                  <span>在 应用市场 中查看<i class="iconfont icon-look"></i></span>
                </div>
              </td>
              <td>
                <span>今：<i class="num-color">2</i></span>
                <span>昨：<i class="num-color">2</i></span>
              </td>
              <td>
                <span>今：<i class="num-color">2</i></span>
                <span>昨：<i class="num-color">2</i></span>
              </td>
              <td>
                <span>今：<i class="num-color">2</i></span>
                <span>昨：<i class="num-color">2</i></span>
              </td>
              <td>
                <span>今：<i class="num-color">2</i></span>
                <span>昨：<i class="num-color">2</i></span>
              </td>
              <td>
                <span>查看</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table