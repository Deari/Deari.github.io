import React from 'react'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form'

import s from './Basic-new.scss'
import './form.scss'
import cx from 'classnames'

import InputText from './InputText'
import ImageUploader from './Uploader/img'
import Tags from './Tags'
import AppDesc from './AppDesc'

class Main extends React.Component {
  state={
    form: {
      appName: '',
      appLogo: '',
      appDesc: '',
      tags: []
    }
  }

  handleChange(key, value) {
    this.setState({
      form: {
        ...this.state.form,
        [key]: value
      }
    })
  }

  saveHandle () {
    // console.log(this.state)
  }

  render () {
    const {form} = this.state;
    
    console.log(this.props)

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
          您的这次更新会在新的应用版本发布后，在应用市场上显示。
        </span>
        <form className="site-form" onSubmit={this.props.handleSubmit((v) => { console.log(v, "submit")  })}>
          <Field
            required 
            label='应用名称' 
            name='appName' 
            description='您的应用在应用市场中显示的名称' 
            component={InputText}
          />

          <Field
            required 
            label='应用图片' 
            name='appLogo'
            description='此图标将用于应用市场，最低分辨率至少为72DPI，并采用RGB色彩空间。它不能包含图层或圆角。'
            component={ImageUploader}
          />

          <Field
            required 
            label='应用简介' 
            name='appDesc'
            description='对您的应用的描述，用以详细说明特性和功能' 
            component={AppDesc}
          />

          <Field
            required 
            label='标签' 
            dataSource={[ { value: 'test' } ]}
            name='tags'
            description='一个或多个标签，用以描述您的应用' 
            component={Tags}
          />

          <div className='form-actions'>
            <button className={cx('primaryBtn', s.saveBtn)} onClick={this.saveHandle}>保存</button>
          </div>
        </form>
      </div>
    </div>
  }
}

export default reduxForm({
  form: 'create_apps'
})(Main);
