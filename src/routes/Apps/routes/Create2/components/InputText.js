import React from 'react'
import s from './Basic-new.scss'
const InputText = (props) => {
  const { meta: { touched, dirty, error, warning } } = props;

	return <div className="form-group">
    <label className="label">{props.label}</label>
    <div className="form-item">
      <div className="item-wrapper">
        <div className="input-affix-wrapper">
          <input type="text" className="form-input" {...props.input} />
          <i className="iconfont icon-edit"></i>
        </div>
        <div className={s.helpMsg}>
          <i className="iconfont icon-miashu"></i>
          <p className={s.cont}>{props.description}</p>
        </div>
      </div>
      {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
    </div>
  </div>
}
export default InputText;