import React from 'react'
import cx from 'classnames'
import s from './H5-new.scss'

class Main extends React.Component {
  render () {
  	return <div className={s['main-container']}>
      <h2 className={s['current-location']}>
        <a className="iconfont icon-fanhui" href="/apps/list"></a>
        <span className={s.site}>我的应用</span>
        创建新应用 ( H5 类型 )
      </h2>
      <ul className={`${s['tabs-item']} ${s['tabs-margin']}`}>
        <li className={cx([s.tabs],[s.active])}>基本信息</li>
        <li className={s.tabs}>版本信息</li>
      </ul>
      <div className={`${s['tabs-content']} ${s['tabs-status']}`}>
      	<form className={s['site-form']}>
      		<div className={s['form-group']}>
            <label className={s['control-label']}>版本介绍</label>
            <div className={s['form-item']}>
              <div className={`${s['item-control']} ${s['item-summary']}`}>
                <textarea className={s['item-textarea']}></textarea>
                <div className={s['form-info']}>
                  <i className="iconfont icon-miashu"></i>
                  <p className={s['info-content']}>对您的 应用 的描述，用以详细说明特性和功能</p>
                </div>
              </div>
              <div className={s['has-error']}>请输入内容</div>
            </div>
          </div>
          <div className={s['form-group']}>
            <label className={s['control-label']}>版本号</label>
            <div className={s['form-item']}>
              <div className={s['item-control']}>
                <div className={s['item-iconfont']}>
                	<span className={s['rule-text']}>您的线上版本为：10.1.1。您要填入的版本号。编号应遵循软件版本规范。</span>
                  <input type="text" className={s['form-control']}/>
                </div>
                <div className={s['form-info']}>
                  <i className="iconfont icon-miashu"></i>
                  <p className={s['info-content']}>您的 应用 在 应用市场 中显示的名称</p>
                </div>
              </div>
              <span className={s['has-error']}>请输入内容</span>
            </div>
          </div>
          <div className={s['form-group']}>
            <label className={s['control-label']}>应用文件<br/>(APK)</label>
            <div className={s['form-item']}>
              <div className={`${s['item-control']} ${s['item-upload']}`}>
                <span className={s['upload-btn']}>
                  <input type="file" className={s['upload-file']}/>
                  <div className={s.text}>选择文件</div>
                </span>
              </div>
              <div className={s['has-error']}>请输入内容</div>
              <ul className={`${s['img-item']} ${s.active}`}>
                <li className={s['upload-img']}>
                  <img src=""/>
                </li>
              </ul>
            </div>
          </div>
          <div className={s['form-group']}>
            <label className={s['control-label']}>版本发布</label>
            <div className={s['form-item']}>
            	<div className={`${s['item-control']}${s['item-upload']}`}>
            		<p className={s['publish-text']}>在您的应用获得批准后，我们可以立即为您发布它。如果您要自己发布该应用。请选择一个日期或者在批准后的任何时刻手动发布它。 当您的应用处于“等待开发人员发布”状态。您可以继续测试，或者拒绝发布并提交一个新的版本。无论您选择哪个选项，我们必须先 处理您的应用，然后才能在应用市场上提供它。当您的应用处于“审核中”状态，您无法拒绝您的应用。</p>
            		<div className={s['apply-radio']}>
            			<div className={s['row-radio']}>
								    <input type="radio" name="radio" value="" className="input-radio"/>
										<span className="radio-item">
										    <i className="iconfont icon-radio1"></i>
										    <i className="iconfont icon-radio"></i>
										</span>
									</div>
									<span className={s.text}>手动发布此版本</span>
								</div>
								<div className={s['apply-radio']}>
									<div className={s['row-radio']}>
								    <input type="radio" name="radio" value="" className="input-radio" />
										<span className="radio-item">
										    <i className="iconfont icon-radio1"></i>
										    <i className="iconfont icon-radio"></i>
										</span>
									</div>
									<span className={s.text}>自动发布此版本</span>
            		</div>
            	</div>
            </div>
          </div>
          <div className={s['form-group']}>
            <label className={s['control-label']}>配套使用</label>
            <div className={s['form-item']}>
            	<div className={`${s['item-control']}${s['item-upload']}`}>
            		<p className={s['publish-text']}>应用在创建的配套使用的组件、硬件、应用后，只有当它们全部是已发布状态，才会显示在市场中展示。
<br/>应用市场详情页的显示，如下图：</p>
								<img src="http://open.ffan.net/bf2a12dbd3de591e34788366d7085dc0.png" className={s['img-use']}/>
            		<div className={s['apply-radio']}>
            			<div className={s['radio-row']}>
            				<div className={s['row-radio']}>
									    <input type="radio" name="radio" value="" className="input-radio"/>
											<span className="radio-item">
											    <i className="iconfont icon-radio1"></i>
											    <i className="iconfont icon-radio"></i>
											</span>
										</div>
									<span className={s.text}>组件</span>
            			</div>
									<ul className={s['use-item']}>
										<li className={s['item-img']}></li>
									</ul>
								</div>
								<div className={s['apply-radio']}>
									<div className={s['row-radio']}>
								    <input type="radio" name="radio" value="" className="input-radio" />
										<span className="radio-item">
										    <i className="iconfont icon-radio1"></i>
										    <i className="iconfont icon-radio"></i>
										</span>
									</div>
									<span className={s.text}>硬件</span>
            		</div>
            		<div className={s['apply-radio']}>
            			<div className={s['row-radio']}>
								    <input type="radio" name="radio" value="" className="input-radio"/>
										<span className="radio-item">
										    <i className="iconfont icon-radio1"></i>
										    <i className="iconfont icon-radio"></i>
										</span>
									</div>
									<span className={s.text}>应用</span>
								</div>
            	</div>
            </div>
          </div>
      	</form>
     	</div>
    </div>
  }
}

export default Main;