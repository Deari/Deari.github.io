import React from 'react'
import s from './H5-new.scss'

const InputText = () => {
	return <div className={s['form-group']}>
    <label className={s['control-label']}>应用名称</label>
    <div className={s['form-item']}>
      <div className={s['item-control']}>
        <div className={s['item-iconfont']}>
          <i className="iconfont icon-edit"></i>
          <input type="text" className={s['form-control']}/>
          <i className="iconfont icon-edit"></i>
        </div>
        <div className={s['form-info']}>
          <i className="iconfont icon-miashu"></i>
          <p className={s['info-content']}>您的 应用 在 应用市场 中显示的名称</p>
        </div>
      </div>
      <span className={s['has-error']}>请输入内容</span>
    </div>
  </div>
}
export default InputText;