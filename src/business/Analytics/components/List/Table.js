import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import s from './index-new.scss'
import cx from 'classnames'
import { PageTypes } from 'config/index'
import { appType } from 'config/index'
import TabelItem from './TableItem'
import { getTheme } from 'business/HOCs/theme'

const Table = ({ data, theme }) => {
  return (
    <div className={s.root}>
      <h2 className="content-header"><i className='iconfont icon-sidebar3' />{theme.text}数据统计</h2>
      <table className={`site-table ${s['tableWrapper']}`} cellSpacing='0' cellPadding='0'>
        <thead>
          <tr>
            <th>Logo</th>
            <th>{theme.text}名称</th>
            <th>新增商家</th>
            <th>活跃商家</th>
            <th>启动次数</th>
            <th>下载次数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          { Array.isArray(data) && data.length ?
            data.map((item, index) => <TabelItem key={index} type={theme.type} data={item} />)
            : <tr><td colSpan='7' style={{ textAlign: 'center', padding: '30' }}>暂无数据</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default getTheme(Table)
