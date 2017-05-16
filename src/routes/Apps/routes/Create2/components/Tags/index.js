import React from 'react'
import s from '../Basic-new.scss'
import t from './index-new.scss'
import cx from 'classnames'

const Tags = () => {

	return (
    <div className="form-group">
      <label className='label'>标签</label>
      <div className='form-item'>
        <div className="item-wrapper">
          <ul className={t['item-tag']}>
            <li className={`${t.tags} defaultBtn`}>营销常用</li>
            <li className={`${t.tags} defaultBtn`}>营销常用</li>
            <li className={`${t.tags} defaultBtn`}>营销常用</li>
            <li className={`${t.tags} defaultBtn`}>营销常用</li>
            <li className={`${t.tags} defaultBtn`}>营销常用</li>
            <li className={`${t.tags} defaultBtn`}>营销常用</li>
            <li className={`${t.tags} defaultBtn`}>营销常用</li>
          </ul>
          <div className={s.helpMsg}>
            <i className="iconfont icon-miashu"></i>
            <p className={s.cont}>一个或多个标签，用以描述您的应用</p>
          </div>
        </div>
        <div className="form-item-msg error">请输入内容</div>
      </div>
    </div>
  )
}

export default Tags;