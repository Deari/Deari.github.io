import React from 'react'
import { Field } from 'redux-form'
import TextInput from 'business/AppCreate/TextInput'
import ImageUploader from 'business/AppCreate/Uploader/img'
import Tags from 'business/AppCreate/Tags'
import AppDesc from 'business/AppCreate/AppDesc'
import ScreenSize from 'business/AppCreate/ScreenSize'

import cx from 'classnames'
import './form.scss'
import s from './Basic-new.scss'
import { APP_TYPES } from 'config/appTypes'

const Form = (props) => {
  const { handleSubmit, tagSource, appKind } = props;
  return (
    <form className="site-form" onSubmit={ handleSubmit }>
      <Field
        required 
        label='应用名称' 
        name='appName' 
        description='您的应用在应用市场中显示的名称' 
        component={TextInput}
      />
      { appKind === APP_TYPES.h5.value && 
      <Field
        required 
        label='适配屏幕尺寸' 
        name='screenSize' 
        component={ScreenSize}
      />
      }

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
        dataSource={tagSource}
        name='tags'
        description='一个或多个标签，用以描述您的应用' 
        component={Tags}
      />

      <div className='form-actions'>
        <button type="submit" className={cx('primaryBtn', s.saveBtn)}>保存</button>
      </div>
    </form>
  )
}

export default Form
