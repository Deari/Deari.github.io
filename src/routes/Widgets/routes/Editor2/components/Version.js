import React from 'react'
import VersionForm from '../containers/VersionFormContainer'
import { IndexLink, Link } from 'react-router'
import s from 'business/AppCreate/Basic-new.scss'
import Tab from 'business/AppCreate/Tab'

import BreadCrumb from './BreadCrumb'
import { APP_TYPES } from 'config/appTypes'

const Version = (props) => {
  const { id } = props.params;
  const { appKind } = props.initialValues;
  let typeText = '';
  
  Object.values(APP_TYPES).map(v => {
    if(v.value == appKind) {
      typeText = v.text;
    }
  })
  return <div className='content'>
    <BreadCrumb typeText={typeText} />
    <Tab id={id} type='widgets'></Tab>
    <div className={s.main}>
      <span className={s.tips}>
        <i className="iconfont icon-zhuyi"></i>
        您的这次更新会在新的组件版本发布后，在组件市场上显示。
      </span>
      <VersionForm {...props}></VersionForm>
    </div>
  </div>
}

export default Version;
