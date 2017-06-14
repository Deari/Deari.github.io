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
    <SideBar pageLinks={getPageLinks('widgets')} type={'widgets'} />
    <div className='content'>
      <div className={s.breadcrumb}>
        <Link className="iconfont icon-fanhui" to="/widgets/list"></Link>
        <span className={s.site}>我的组件</span>
        <span className={`${s.site} ${s.noNext}`}>创建新组件 {text}</span>
      </div>
      {props.children}
    </div>
  </div>
}

export default Main
