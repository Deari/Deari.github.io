import React from 'react'
import s from '../Basic-new.scss'
import t from './index-new.scss'
import cx from 'classnames'

const Tags = (props) => {
	return (
    <div className='form-group'>
      <label className='label'>{props.label}</label>
      <div className='form-item'>
        <div className="item-wrapper">
          <textarea name={props.name} placeholder="请输入应用简介。此内容将显示在应用列表页中。" className={t['item-textarea']}
            onChange={props.onChange}
            value={props.value}></textarea>
          <div className={s.helpMsg}>
            <i className="iconfont icon-miashu"></i>
            <p className={s.cont}>{props.description}</p>
          </div>
        </div>
        <div className="form-item-msg error">请输入内容</div>
      </div>
    </div>
  )
}

export default Tags;