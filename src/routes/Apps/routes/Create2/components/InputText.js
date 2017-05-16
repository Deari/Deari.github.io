import React from 'react'
import s from './Basic-new.scss'
const InputText = () => {
	return <div className="form-group">
    <label className="label">应用名称</label>
    <div className="form-item">
      <div className="item-wrapper">
        <div className="input-affix-wrapper">
          <input type="text" className="form-input"/>
          <i className="iconfont icon-edit"></i>
        </div>
        <div className={s.helpMsg}>
          <i className="iconfont icon-miashu"></i>
          <p className={s.cont}>您的 应用 在 应用市场 中显示的名称</p>
        </div>
      </div>
      <div className="form-item-msg error">请输入内容</div>
    </div>
  </div>
}
export default InputText;