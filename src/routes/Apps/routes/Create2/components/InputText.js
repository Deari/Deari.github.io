import React from 'react'
import s from './Basic-new.scss'
const InputText = (props) => {
	return <div className="form-group">
    <label className="label">应用名称</label>
    <div className="form-item">
      <div className="item-wrapper">
        <div className="input-affix-wrapper">
          <input type="text" name={props.name} className="form-input"
            value={props.value}
            onChange={props.onChange}/>
          <i className="iconfont icon-edit"></i>
        </div>
        <div className={s.helpMsg}>
          <i className="iconfont icon-miashu"></i>
          <p className={s.cont}>{props.description}</p>
        </div>
      </div>
      <div className="form-item-msg error">请输入内容</div>
    </div>
  </div>
}
export default InputText;