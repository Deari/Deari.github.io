import React from 'react'
import s from '../Basic-new.scss'
import './radio.scss'

const VersionPublish = () => {
	return (
    <div className="form-group">
      <label className="label">版本发布</label>
      <div className="form-item">
      	<div className="item-wrapper">
      		<p className={s.text}>在您的应用获得批准后，我们可以立即为您发布它。如果您要自己发布该应用。请选择一个日期或者在批准后的任何时刻手动发布它。 当您的应用处于“等待开发人员发布”状态。您可以继续测试，或者拒绝发布并提交一个新的版本。无论您选择哪个选项，我们必须先 处理您的应用，然后才能在应用市场上提供它。当您的应用处于“审核中”状态，您无法拒绝您的应用。</p>
      		<div className="apply-radio">
      			<div className="row-radio">
					    <input type="radio" name="radio" value="" className="input-radio"/>
							<span className="radio-item">
							    <i className="iconfont icon-radio1"></i>
							    <i className="iconfont icon-radio"></i>
							</span>
						</div>
						<span className={s['text-con']}>手动发布此版本</span>
					</div>
					<div className="apply-radio">
						<div className="row-radio">
					    <input type="radio" name="radio" value="" className="input-radio" />
							<span className="radio-item">
							    <i className="iconfont icon-radio1"></i>
							    <i className="iconfont icon-radio"></i>
							</span>
						</div>
						<span className={s['text-con']}>自动发布此版本</span>
      		</div>
      	</div>
      </div>
    </div>
  )
}

export default VersionPublish;