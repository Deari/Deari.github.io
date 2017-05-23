import React from 'react'
import { Field } from 'redux-form'
import { Link } from 'react-router'
import cx from 'classnames'
import s from 'business/AppCreate/Basic-new.scss'
import './form.scss'

import AppDesc from 'business/AppCreate/AppDesc'
import TextInput from 'business/AppCreate/TextInput'
import FileUploader from 'business/AppCreate/Uploader/file'
import VersionPublish from 'business/AppCreate/VersionPublish'

import { APP_TYPES } from 'config/appTypes'

class Main extends React.Component {
  render () {
    const { onlineVersion, handleSubmit, initialValues } = this.props;
    const { appKind } = initialValues;
    const miniProgramInfo = (
      <span style={{ lineHeight: 1.5, color: '#666', fontSize: 12 }}>
        应用类型为“FAP小程序”，请您先试用打包工具(
        <a href='http://fdfs.ffan.net/v2/file/nDjvYxof9gD9AjbH9o4al93o5T2mw9Yp?attachExt=2'>Windows</a> | 
        <a href='http://fdfs.ffan.net/v2/file/BgbBeXayRXw6H5h4aF3115Egr50dM6pr?attachExt=2'>Mac</a>)
        进行打包，请将打包完成后的应用进行上传。
      </span>
    );

    let fileField;
   
    switch(appKind) {
      case APP_TYPES.mini_program.value: 
        fileField = <Field
          required 
          label='应用文件(FAP)' 
          name='_files'
          accept=".fap"
          title={miniProgramInfo}
          description='此图标将用于应用市场，最低分辨率至少为72DPI，并采用RGB色彩空间。它不能包含图层或圆角。'
          component={FileUploader}
        />;
        break;
      case APP_TYPES.apk.value: 
        fileField = <Field
          required 
          label='应用文件(APK)' 
          name='_files'
          accept=".apk"
          description='此图标将用于应用市场，最低分辨率至少为72DPI，并采用RGB色彩空间。它不能包含图层或圆角。'
          component={FileUploader}
        />;
        break;
      case APP_TYPES.h5.value: 
        fileField = <Field
          required 
          label='应用网址' 
          name='fileLink' 
          component={TextInput}
        />;
    }

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

        <Field
          required 
          label='版本号' 
          name='codeVersion' 
          title={onlineVersion && `您的线上版本为：${onlineVersion}。您要填入的版本号。编号应遵循软件版本规范。`}
          description='您要填入的 App 版本号。编号应遵循软件版本规范。比如：1.0.0，即为大版本，代表核心框架调整。1.1.0，即为小版本，代表核心功能调整。1.1.1，即为子版本，代表优化或修复bug。' 
          component={TextInput}
        />
        
        {fileField}

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

export default Main
