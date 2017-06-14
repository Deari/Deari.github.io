import React from 'react'
import s from 'business/AppCreate/Basic-new.scss'
import { IndexLink, Link } from 'react-router'
import VersionForm from '../containers/VersionFormContainer'
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
  return <div className="content">
    <BreadCrumb typeText={typeText}></BreadCrumb>
    <Tab id={id} type='apps'></Tab>
    <div className={s.main}>
      <span className={s.tips}>
        <i className="iconfont icon-zhuyi"></i>
        您的这次更新会在新的应用版本发布后，在应用市场上显示。
      </span>
      <VersionForm {...props}></VersionForm>
    </div>
  </div>
}

export default Version;