import React from 'react'
import { Field } from 'redux-form'
import TextInput from 'business/AppCreate/TextInput'
import ImageUploader from 'business/AppCreate/Uploader/img'
import Tags from 'business/AppCreate/Tags'
import AppDesc from 'business/AppCreate/AppDesc'
import ScreenSize from 'business/AppCreate/ScreenSize'
import cx from 'classnames'
import s from 'business/AppCreate/Basic-new.scss'

import { APP_TYPES } from 'config/appTypes'

const ImageLimit = {
  width: 400,
  height: 400,
  fileType: JSON.stringify(['png']),
  fileSize: 1024 * 300,
};

const Form = (props) => {
  const { handleSubmit, tagSource, appKind, onSubmit } = props;
  const isH5 = +appKind === +APP_TYPES.h5.value;
  const isEditMode = !!props.editMode;
  
  let useList = [{
    id: 'mobile',
    classname: 'img-small',
    text: '手机端',
    value: 1
  }, {
    id: 'pad',
    classname: 'img-middle',
    text: 'Pad端',
    value: 2
  }]

  if(isH5) {
    useList = useList.concat([
      {
        id: 'pc',
        classname: 'img-large',
        text: 'PC端',
        value: 4
      }
    ])
  }

  return (
    <form className="site-form" onSubmit={ handleSubmit }>
      <Field
        required 
        label='应用名称' 
        placeholder='请输入应用名称'
        maxLength={50}
        name='appName' 
        description='您的应用在应用市场中显示的名称' 
        component={TextInput}
      />
      
      <Field
        required 
        label='使用场景' 
        list={useList}
        name='screenSize' 
        component={ScreenSize}
      />

      <Field
        required 
        label='应用图片' 
        limit={ImageLimit}
        title={ <span className={s['rule-text']}>请上传应用高清图片<br/>400*400像素，仅支持PNG格式，大小不超过300KB </span>}
        name='appLogo'
        description='此图标将用于应用市场，最低分辨率至少为72DPI，并采用RGB色彩空间。它不能包含图层或圆角。'
        component={ImageUploader}
      />

      <Field
        required 
        label='应用简介' 
        name='appDesc'
        placeholder='请输入应用简介，此内容将显示在应用列表页中'
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
        <button type="submit" className={cx('btn-default', s.saveBtn)}>保存</button>
        { isEditMode ? <button onClick={ handleSubmit((values)=>{
            onSubmit(values, 1)
          }) } className={cx('btn-primary', s.saveBtn)}>保存并编辑版本信息</button> : null
        }
      </div>
    </form>
  )
}

export default Form
