import React from 'react'
import t from './index-new.scss'
import cx from 'classnames'
import Tips from '../Tips'

const Tags = (props) => {
  const { required, description, meta: { touched, dirty, error, warning } } = props;

	return (
    <div className='form-group'>
      <label className={ cx("label", { "required": required })}>{props.label}</label>
      <div className='form-item'>
        <div className="item-wrapper">
          <textarea {...props.input} className={t['item-textarea']}></textarea>
          { description && <Tips content={description}></Tips> }
        </div>
        {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
      </div>
    </div>
  )
}

export default Tags;