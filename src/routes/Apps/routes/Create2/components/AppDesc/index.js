import React from 'react'
import s from '../Basic-new.scss'
import t from './index-new.scss'
import cx from 'classnames'

const Tags = (props) => {
  const { meta: { touched, dirty, error, warning } } = props;

	return (
    <div className='form-group'>
      <label className='label'>{props.label}</label>
      <div className='form-item'>
        <div className="item-wrapper">
          <textarea {...props.input} className={t['item-textarea']}></textarea>
          <div className={s.helpMsg}>
            <i className="iconfont icon-miashu"></i>
            <p className={s.cont}>{props.description}</p>
          </div>
        </div>
        {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
      </div>
    </div>
  )
}

export default Tags;