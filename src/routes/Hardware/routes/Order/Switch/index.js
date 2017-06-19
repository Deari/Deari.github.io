/**
 * Created by lizhuo on 2017/6/15.
 */
import React from 'react'
import s from './index-new.scss'

const Switch = (props) => {
  const { itemList } = props;
  return (
    <div className={`${s.tabs}`}>
      <ul className='tabs-titles'>
        <li className={`tabs-item active ${s.tabNav}`}>
          <span className={s['item-text']}>全部</span>
        </li>
        <li className={`tabs-item ${s.tabNav}`}>
          <span className={s['item-text']}>未付款</span>
        </li>
        <li className={`tabs-item ${s.tabNav}`}>
          <span className={s['item-text']}>已付款</span>
        </li>
        <li className={`tabs-item ${s.tabNav}`}>
          <span className={s['item-text']}>未出库</span>
        </li>
        <li className={`tabs-item ${s.tabNav}`}>
          <span className={s['item-text']}>已出库</span>
        </li>
        <li className={`tabs-item ${s.tabNav}`}>
          <span className={s['item-text']}>取消</span>
        </li>
        <li className={`tabs-item ${s.tabNav}`}>
          <span className={s['item-text']}>已完成</span>
        </li>
        <li className={`tabs-item ${s.tabNav}`}>
          <span className={s['item-text']}>售后／退款</span>
        </li>
      </ul>
    </div>
  )
}

export default Switch;
