import React from 'react'
import s from './index-new.scss'

const TableView = () => {
  return (
    < div className={s.tableWrap} >
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
    </div >
  )
}

export default TableView

  