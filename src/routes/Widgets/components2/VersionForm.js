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
import Relative from 'business/AppCreate/Relative'
import CodeSetting from 'business/AppCreate/CodeSetting'

import { APP_TYPES } from 'config/appTypes'

class Main extends React.Component {
  render () {
    const { onlineVersion, handleSubmit, initialValues } = this.props;
    const { appKind } = initialValues;
    const miniProgramInfo = (
      <span style={{ lineHeight: 1.5, color: '#666', fontSize: 12 }}>
        应用类型为“FAP小程序”，请您先使用打包工具(
        <a href='http://fdfs.ffan.net/v2/file/3l8v0ztIcPI9vBB18g614JF370J47byY?attachExt=2'>Windows</a> | 
        <a href='http://fdfs.ffan.net/v2/file/ZnFWmHtPYah2Fq2a8nuGhVW1NCT9OTMV?attachExt=2'>Mac</a>)
        进行打包，请将打包完成后的应用进行上传。
      </span>
    );

    let fileField;
    let configField;
   
    switch(appKind) {
      case APP_TYPES.mini_program.value: 
        fileField = <Field
          required 
          label='组件文件(FAP)' 
          name='_files'
          accept=".fap"
          title={miniProgramInfo}
          component={FileUploader}
        />;
        configField = <Field
          required 
          label='组件配置'
          name='codeSetting' 
          component={CodeSetting}
        />
        break;
      
      case APP_TYPES.h5.value: 
        fileField = <Field
          required 
          label='组件网址' 
          name='fileLink' 
          component={TextInput}
        />;
    }

  	return (
      <form>
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
        {configField}
        <Field
          required 
          label='版本发布'
          name='autoPublish' 
          component={VersionPublish}
        />
        
        <Field
          required 
          label='配套使用'
          name='relations' 
          component={Relative}
        />

        <div className='form-actions'>
          <button onClick={ handleSubmit(this.props.save)} className={cx('primaryBtn', s.saveBtn)}>保存</button>
          <button onClick={ handleSubmit(this.props.publish)} className={cx('primaryBtn', s.saveBtn)}>提交审核</button>
        </div>
      </form>
    )
  }
}

export default Main
