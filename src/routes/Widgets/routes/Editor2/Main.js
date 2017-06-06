import React from 'react'
import { IndexLink, Link } from 'react-router'
import cx from 'classnames'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import { APP_TYPES } from 'config/appTypes'
import s from 'business/AppCreate/Basic-new.scss'

const Main = (props) => {
  const { id, type } = props.params;
  const _type = APP_TYPES[type];
  
  let text;
  if(_type) {
    text = `(${type.text}类型)`;
  }

  return <div className='container'>
    <SideBar pageLinks={getPageLinks('widgets')} type={'widgets'} />
    <div className='content'>
      <div className={s.breadcrumb}>
        <Link className="iconfont icon-fanhui" href="/widgets/list"></Link>
        <span className={s.site}>我的组件</span>
        <span className={`${s.site} ${s.noNext}`}>编辑组件 {text}</span>
      </div>
      {props.children}
    </div>
  </div>
}

export default Main
