import React from 'react'
import { Link } from 'react-router'
import s from './index-new.scss'
import cx from 'classnames'
import { PageTypes } from 'config/index'

const Nav = ({ type }) => {
  return <div className={s.createNew}>
    <h1 className={s.createTitle}>创建新{PageTypes[type]}</h1>
    <h2 className={s.title}>请选择{PageTypes[type]}类型</h2>
    <div className={s.links}>
      <Link to={`/${type}/create2/mini_program`} className={cx(s.item, s.rn)} >
        <i className='iconfont icon-react-native' />
        <span>FAP小程序</span>
      </Link>
      <Link to={`/${type}/create2/h5`} className={cx(s.item, s.h5)} >
        <i className='iconfont icon-html5' />
        <span>HTML5</span>
      </Link>
      { type === 'apps' && <Link to={`/${type}/create2/apk`} className={cx(s.item, s.apk)} >
        <i className='iconfont icon-android' />
        <span>APK</span>
      </Link> }
    </div>
  </div>
}

export default Nav