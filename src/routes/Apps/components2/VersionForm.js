import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import s from './Basic-new.scss'
import './form.scss'

import AppDesc from 'business/AppCreate/AppDesc'
import TextInput from 'business/AppCreate/TextInput'
import ImageUploader from 'business/AppCreate/Uploader/img'
import VersionPublish from 'business/AppCreate/VersionPublish'

class Main extends React.Component {
  render () {
    const { onlineVersion, handleSubmit } = this.props;

  	return (
      <form onSubmit={handleSubmit}>
        <Field
          required 
          label='版本介绍' 
          name='codeDesc'
          placeholder='请输入版本介绍。此内容将显示在应用详情页的版本信息中。'
          description='描述此版本的新增内容，例如增添了何种新功能，有何改进之处以及修正了哪些错误。' 
          component={AppDesc}
        />

        { onlineVersion && <span className={s['version-rule']}>您的线上版本为：{onlineVersion}。您要填入的版本号。编号应遵循软件版本规范。</span>}
        <Field
          required 
          label='版本号' 
          name='codeVersion' 
          description='您要填入的 App 版本号。编号应遵循软件版本规范。比如：1.0.0，即为大版本，代表核心框架调整。1.1.0，即为小版本，代表核心功能调整。1.1.1，即为子版本，代表优化或修复bug。' 
          component={TextInput}
        />
        <Field
          required 
          label='应用网址' 
          name='fileLink' 
          component={TextInput}
        />
        <Field
          required 
          label='版本发布'
          name='autoPublish' 
          component={VersionPublish}
        />
        
        {/*<div className="form-group">
          <label className="label label-no">配套使用</label>
          <div className="form-item">
            <div className="item-wrapper">
              <p className={s.text}>应用在创建的配套使用的组件、硬件、应用后，只有当它们全部是已发布状态，才会显示在市场中展示。
                <br/>应用市场详情页的显示，如下图：</p>
              <img src="http://open.ffan.net/bf2a12dbd3de591e34788366d7085dc0.png" className={s['img-use']}/>
              <div className={s['apply-radio']}>
                  <div className="row-radio">
                    <input type="checkbox"  value="" id="widgets" className="input-radio"/>
                    <span className="radio-item">
                        <i className="iconfont icon-radio1"></i>
                        <i className="iconfont icon-radio"></i>
                    </span>
                  </div>
                <label htmlFor="widgets" className={s['text-con']}>组件</label>
              </div>
              
              <div className={s['apply-radio']}>
                <div className="row-radio">
                  <input type="checkbox"  value="" id="hardware" className="input-radio" />
                  <span className="radio-item">
                      <i className="iconfont icon-radio1"></i>
                      <i className="iconfont icon-radio"></i>
                  </span>
                </div>
                <label htmlFor="hardware" className={s['text-con']}>硬件</label>
              </div>
              
              <div className={s['apply-radio']}>
                <div className="row-radio">
                  <input type="checkbox" value="" id="app" className="input-radio"/>
                  <span className="radio-item">
                      <i className="iconfont icon-radio1"></i>
                      <i className="iconfont icon-radio"></i>
                  </span>
                </div>
                <label htmlFor="app" className={s['text-con']}>应用</label>
              </div>
            </div>
          </div>
        </div>*/}
        <div className='form-actions'>
          <button type='submit' className={cx('primaryBtn', s.saveBtn)}>保存</button>
          <button className={cx('primaryBtn', s.saveBtn)}>提交审核</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'apps_version_info',
  enableReinitialize: true,
  validate
})(Main)
