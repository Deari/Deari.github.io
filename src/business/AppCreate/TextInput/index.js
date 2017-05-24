import React from 'react'
import Tips from '../Tips'

const InputText = (props) => {
  const { title, description, meta: { touched, dirty, error, warning } } = props;

	return <div className="form-group">
    <label className="label">{props.label}</label>
    <div className="form-item">
    	{ title && <h2 className="site-title">{title}</h2>}
      <div className="item-wrapper">
        <div className="input-affix-wrapper">
          <input type="text" className="form-input" {...props.input} />
          <i className="iconfont icon-edit"></i>
        </div>
        { description && <Tips content={description}></Tips> }
      </div>
      {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
    </div>
  </div>
}
export default InputText;