import React, { Component } from 'react'

class Analytics extends Component {
  state = {

  }

  componentDidMount() {

  }

  redner() {
    return (
      <div className="Analytics">
        This is Analytics.
        <div className="search"><input type="text"/></div>
        <div className="panel">
          <table>
            <th>
              <td>LOGO</td>
              <td>应用名称</td>
              <td>新增商家</td>
              <td>活跃商家</td>
              <td>启动次数</td>
              <td>下载次数</td>
              <td>操作</td>
            </th>
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
          </table>
        </div>
        <div>This is pagination.</div>
      </div>
    )
  }
}

export default Analytics
