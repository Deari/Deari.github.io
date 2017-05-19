import React from 'react'
import VersionForm from '../containers/VersionFormContainer'
import s from 'business/AppCreate/Basic-new.scss'
import { Link } from 'react-router'
import cx from 'classnames'
import Header from './Header'

const Version = (props) => {

  return <div>
    <Header {...props}></Header>
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
