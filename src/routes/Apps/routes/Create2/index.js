import React from 'react'
import { Link } from 'react-router'
import s from './index-new.scss'
import cx from 'classnames'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'

const Main = (props) => {
  const pageLinks = getPageLinks('apps').filter((item) => { return !item.hide })
  return <div className={s.createNew}>
    <h1 className={s.createTitle}>创建新应用</h1>
    <h2 className={s.title}>请选择应用类型</h2>
    <div className={s.links}>
      <Link to='/apps/create2/mini_program' className={cx(s.item, s.rn)} >
        <i className='iconfont icon-react-native' />
        <span>FAP小程序</span>
      </Link>
      <Link to='/apps/create2/h5' className={cx(s.item, s.h5)} >
        <i className='iconfont icon-html5' />
        <span>HTML5</span>
      </Link>
      <Link to='/apps/create2/apk' className={cx(s.item, s.apk)} >
        <i className='iconfont icon-android' />
        <span>APK</span>
      </Link>
    </div>
  </div>
}

module.exports = (store) => ({
  path: 'create2',
  component  : require('./Main').default,
  indexRoute : {
    component: Main
  },

  getChildRoutes (partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./containers/H5').default,
        require('./containers/MiniProgram').default,
        require('./containers/Apk').default
      ])
    })
  }

})
