import React from 'react'
import s from '../Basic-new.scss'
import t from './index-new.scss'
import cx from 'classnames'

const Tags = () => {
	return (
    <div className='form-group'>
      <label className='label'>应用简介</label>
      <div className='form-item'>
        <div className="item-wrapper">
          <textarea className={t['item-textarea']}></textarea>
          <div className={s.helpMsg}>
            <i className="iconfont icon-miashu"></i>
            <p className={s.cont}>对您的 应用 的描述，用以详细说明特性和功能</p>
          </div>
        </div>
        <div className="form-item-msg error">请输入内容</div>
      </div>
    </div>
  )
}

export default Tags;