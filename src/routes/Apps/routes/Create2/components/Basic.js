import React from 'react'
import s from './Basic-new.scss'
import './form.scss'
import cx from 'classnames'

import InputText from './InputText'
import ImageUploader from './Uploader/img'
import Tags from './Tags'
import AppDesc from './AppDesc'



class Main extends React.Component {
  render () {
    return <div className={s['create-container']}>
      <h2 className={s.breadcrumb}>
        <a className="iconfont icon-fanhui" href="/apps/list"></a>
        <span className={s.site}>我的应用</span>
        创建新应用 ( H5 类型 )
      </h2>
      
      <h2 className={s.pageTitle}>基本信息</h2>
      <div className={s.main}>
        <span className={s.tips}>
          <i className="iconfont icon-zhuyi"></i>
          您的这次更新会在新的 应用 版本发布后，在 应用市场 上显示。
        </span>
        <form className="site-form">
          <InputText></InputText>
          <ImageUploader></ImageUploader>
          <AppDesc></AppDesc>
          <Tags></Tags>
          <div className='form-actions'>
            <button className={cx('btn-primary', s.saveBtn)}>保存</button>
          </div>
        </form>
      </div>
    </div>
  }
}

export default Main;