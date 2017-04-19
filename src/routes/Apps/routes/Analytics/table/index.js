import React, { Component } from 'react'
import s from './index-new.scss'

class Table extends Component {
  
  render() {
    return (
      <div className="panel">
        <table>
          <thead>
            <tr>
              <th>LOGO</th>
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
                  <span>FAP</span>
                  <span>简介</span>
                </div>
              </td>
              <td>
                <span>今：2</span>
                <span>昨：2</span>
              </td>
              <td>
                <span>今：2</span>
                <span>昨：2</span>
              </td>
              <td>
                <span>今：2</span>
                <span>昨：2</span>
              </td>
              <td>
                <span>今：2</span>
                <span>昨：2</span>
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