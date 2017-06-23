import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import s from 'business/AppCreate/Basic-new.scss'
import { APP_TYPES } from 'config/appTypes'

const Main = (props) => {
  const type = APP_TYPES[props.params.type];
  let text;
  if(type) {
    text = `(${type.text}类型)`;
  }

  return <div className='container'>
    <SideBar pageLinks={getPageLinks('apps')} type={'apps'} />
    <div className='content'>
      <div className={s.breadcrumb}>
        <Link className="iconfont icon-fanhui" to="/apps/list"></Link>
        <span className={s.site}>我的应用</span>
        <span className={`${s.site} ${s.noNext}`}>创建新应用 {text}</span>
      </div>
      {props.children}
    </div>
  </div>
}

export default Main
