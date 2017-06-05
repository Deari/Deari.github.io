import React from 'react'
import { Field } from 'redux-form'
import TextInput from 'business/AppCreate/TextInput'
import ImageUploader from 'business/AppCreate/Uploader/img'
import Tags from 'business/AppCreate/Tags'
import AppDesc from 'business/AppCreate/AppDesc'
import PhoneSize from 'business/AppCreate/PhoneSize'

import './form.scss'
import cx from 'classnames'
import s from 'business/AppCreate/Basic-new.scss'

import { APP_TYPES } from 'config/appTypes'

const Form = (props) => {
  const { handleSubmit, tagSource, appKind, defaultLayout={} } = props;
  const { w, h } = defaultLayout
  const isEditMode = !!props.edit;

  let example = ( w == 1 && h == 1 ?
    <div className={`${s.example}`}>
      <div className={s.content}>
        <a className={s['example-img']} href="http://nres.ffan.com/newh5/2017426/b712af2abb20f1f88d1b8c46a1612bbdaea1c8b5.psd">
          <span className={s.img}></span>
          <span className={`${s.img} ${s['img-hover']}`}></span>
          <span className={s.name}>下载模板</span>
        </a>
        <div className={s['example-text']}>
          <h3 className={s.title}>图片示例</h3>
          <p className={s.con}>需包含：圆形图标 + 组件名称 点击左侧图片，下载模板文件制作组件图片</p>
        </div>
      </div>
    </div> : null
  )

  return (
    <form className="site-form" onSubmit={ handleSubmit }>
      <Field
        required 
        label='组件名称' 
        name='appName' 
        description='您的组件在组件市场中显示的名称' 
        component={TextInput}
      />

      <Field
        required 
        name='defaultLayout'
        isEditMode={isEditMode}
        component={PhoneSize}
      />

      <Field
        required 
        label='预览图' 
        title={<span className={s['rule-text']}>预览图用于商家在装修自己店面时，在操作区域展示的图片<br/>大小不超过300KB</span>}
        name='appPreviewImage'
        component={ImageUploader}
        example={example}
      />

      <Field
        required 
        label='组件图片' 
        title={<span className={s['rule-text']}>请上传组件高清图片<br/>400*400像素，仅支持PNG格式，大小不超过300KB</span>}
        name='appLogo'
        description='此图标将用于组件市场，最低分辨率至少为72DPI，并采用RGB色彩空间。它不能包含图层或圆角。'
        component={ImageUploader}
      />

      <Field
        required 
        label='组件简介' 
        name='appDesc'
        description='对您的组件的描述，用以详细说明特性和功能' 
        component={AppDesc}
      />

      <Field
        required 
        label='标签' 
        dataSource={tagSource}
        name='tags'
        description='一个或多个标签，用以描述您的组件' 
        component={Tags}
      />

      <div className='form-actions'>
        <button type="submit" className={cx('primaryBtn', s.saveBtn)}>保存</button>
      </div>
    </form>
  )
}

export default Form
