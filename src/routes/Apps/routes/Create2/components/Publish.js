import React from 'react'
import { connect } from 'react-redux'
import {getFormValues, Field, reduxForm} from 'redux-form'
import { validate } from './validate'
import { Link } from 'react-router'
import cx from 'classnames'
import s from './Basic-new.scss'
import t from './Version-new.scss'
import './form.scss'
import AppDesc from './AppDesc'
import InputText from './InputText'
import ImageUploader from './Uploader/img'
import VersionPublish from './VersionPublish'

class Main extends React.Component {
  render () {
  	return <div className={s['edit-container']}>
      <h2 className={s.breadcrumb}>
        <a className="iconfont icon-fanhui" href="/apps/list"></a>
        <span className={s.site}>我的应用</span>
        创建新应用 ( H5 类型 )
      </h2>
      <div className={t.tabs}>
      	<ul className={t['tabs-titles']}>
	        <li className="tabs-item"><Link className={t.address} to='/apps/create2/h5/basic'>基本信息</Link></li>
	        <li className={cx("tabs-item","active")}><Link className={t.address} to='/apps/create2/h5/version'>版本信息</Link></li>
	      </ul>
      </div>
      
      <div className={s.main}>
      	<form className={s['site-form']}>
          <Field
            required 
            label='应用简介' 
            name='appDesc'
            description='对您的应用的描述，用以详细说明特性和功能' 
            component={AppDesc}
          />

          {/*<span className={s['rule-text']}>您的线上版本为：10.1.1。您要填入的版本号。编号应遵循软件版本规范。</span>*/}
          <Field
            required 
            label='应用名称' 
            name='appName' 
            description='您的应用在应用市场中显示的名称' 
            component={InputText}
          />
      		{/*<div className={s['form-group']}>
            <label className={s['label']}>版本介绍</label>
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
          </div>*/}

          <Field
            required 
            label='应用图片' 
            name='appLogo'
            description='此图标将用于应用市场，最低分辨率至少为72DPI，并采用RGB色彩空间。它不能包含图层或圆角。'
            component={ImageUploader}
          />
          {/*<div className={s['form-group']}>
            <label className={s['label']}>应用文件<br/>(APK)</label>
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
          </div>*/}
          <VersionPublish></VersionPublish>
          <div className="form-group">
            <label className="label label-no">配套使用</label>
            <div className="form-item">
            	<div className="item-wrapper">
            		<p className={s.text}>应用在创建的配套使用的组件、硬件、应用后，只有当它们全部是已发布状态，才会显示在市场中展示。
<br/>应用市场详情页的显示，如下图：</p>
								<img src="http://open.ffan.net/bf2a12dbd3de591e34788366d7085dc0.png" className={s['img-use']}/>
            		<div className="apply-radio">
            				<div className="row-radio">
									    <input type="checkbox"  value="" className="input-radio"/>
											<span className="radio-item">
											    <i className="iconfont icon-radio1"></i>
											    <i className="iconfont icon-radio"></i>
											</span>
										</div>
									<span className={s['text-con']}>组件</span>
								</div>
								
								<div className="apply-radio">
									<div className="row-radio">
								    <input type="checkbox"  value="" className="input-radio" />
										<span className="radio-item">
										    <i className="iconfont icon-radio1"></i>
										    <i className="iconfont icon-radio"></i>
										</span>
									</div>
									<span className={s['text-con']}>硬件</span>
            		</div>
            		
            		<div className="apply-radio">
            			<div className="row-radio">
								    <input type="checkbox" value="" className="input-radio"/>
										<span className="radio-item">
										    <i className="iconfont icon-radio1"></i>
										    <i className="iconfont icon-radio"></i>
										</span>
									</div>
									<span className={s['text-con']}>应用</span>
								</div>
            	</div>
            </div>
          </div>
          <div className='form-actions'>
            <button className={cx('primaryBtn', s.saveBtn)}>保存</button>
            <button className={cx('primaryBtn', s.saveBtn)}>提交审核</button>
          </div>
      	</form>
     	</div>
    </div>
  }
}

export default connect((state)=>{
  return {
    formValues: getFormValues('create_apps_2')(state) || {}
  }
})(reduxForm({
  form: 'create_apps_2',
  initialValues: { appName1: 'http://img1.ffan.com/T1MLATBgEv1RCvBVdK' },
  validate
})(Main))
