import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'

const ScreenSize = (props) => {

	return (
    <div className="form-group">
      <label className='label'>{props.label}</label>
      <div className='form-item'>
        <div className="item-wrapper">
          <h3 className={s.title}>请选择要适配的屏幕尺寸</h3>
          <ul className={s.list}>
          	<li className={s.item}>
          		<div className={`${s.img} ${s['img-small']}`}></div>
	          	<div className={s['size-text']}>
	          		<span className={s.screen}>小屏幕</span>
	          		<span className={s.advice}>手机 (建议5英寸)</span>
	          	</div>
	      			<div className={`row-radio ${s.radioBtn}`}>
						    <input type="checkbox" value="" className={`input-radio ${s.screenRadio}`}/>
								<span className="radio-item">
								    <i className="iconfont icon-checkbox"></i>
								    <i className="iconfont icon-checkbox1"></i>
								</span>
							</div>
          	</li>
          	<li className={s.item}>
          		<div className={`${s.img} ${s['img-middle']}`}></div>
	          	<div className={s['size-text']}>
	          		<span className={s.screen}>中等屏幕</span>
	          		<span className={s.advice}>平板 (建议8英寸)</span>
	          	</div>
	      			<div className={`row-radio ${s.radioBtn}`}>
						    <input type="checkbox" value="" className={`input-radio ${s.screenRadio}`}/>
								<span className="radio-item">
								    <i className="iconfont icon-checkbox"></i>
								    <i className="iconfont icon-checkbox1"></i>
								</span>
							</div>
          	</li>
          	<li className={s.item}>
          		<div className={`${s.img} ${s['img-large']}`}></div>
	          	<div className={s['size-text']}>
	          		<span className={s.screen}>大屏幕</span>
	          		<span className={s.advice}>桌面 (≥1440px)</span>
	          	</div>
	      			<div className={`row-radio ${s.radioBtn}`}>
						    <input type="checkbox" value="" className={`input-radio ${s.screenRadio}`}/>
								<span className="radio-item">
								    <i className="iconfont icon-checkbox"></i>
								    <i className="iconfont icon-checkbox1"></i>
								</span>
							</div>
          	</li>
          </ul>
        </div>
        
      </div>
    </div>
  )
}

export default ScreenSize;