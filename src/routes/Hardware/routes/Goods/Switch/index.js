/**
 * Created by lizhuo on 2017/6/13.
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
          <span className={s['item-text']}>已上架</span>
        </li>
        <li className={`tabs-item ${s.tabNav}`}>
          <span className={s['item-text']}>已下架</span>
        </li>
        <li className={`tabs-item ${s.tabNav}`}>
          <span className={s['item-text']}>待上架</span>
        </li>
        <li className={`tabs-item ${s.tabNav}`}>
          <span className={s['item-text']}>缺货</span>
        </li>
      </ul>
    </div>
  )
}

export default Switch;
