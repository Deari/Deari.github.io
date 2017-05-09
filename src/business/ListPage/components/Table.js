import React from 'react'
import s from './table-new.scss'
import { PageTypes } from 'config/index'
import TableItem from './TableItem'

const Table = ({ data, type }) => {
  return (
    <div className={s.root}>
      <table className={s.table} cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th>Logo</th>
            <th>{PageTypes[type]}名称</th>
            <th>价格</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          { Array.isArray(data) && data.length ?
            data.map((item, index) => <TableItem key={index} type={type} data={item} />) 
            : <tr><td colSpan="7" style={{textAlign: 'center', padding: '30'}}>暂无数据</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table