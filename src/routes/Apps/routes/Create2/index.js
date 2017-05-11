import React from 'react'
import { Link } from 'react-router'
import s from './index-new.scss'

const Main = () => {
  return <div className={s.createNew}>
    <h1 className={s.createTitle}>创建新应用</h1>
    <h2 className={s.title}>请选择应用类型</h2>
    <div className={s.links}>
      <Link to="" className="next rn-btn" >
        <i className="iconfont icon-react-native"></i>FAP小程序
      </Link>
      <Link to="" className="next h5-btn" >
        <i className="iconfont icon-html5"></i>HTML5
      </Link>
      <Link to="" className="next apk-btn" >
        <i className="iconfont icon-android"></i>APK
      </Link>
    </div>
  </div>
}

module.exports = (store) => ({
  path: 'create2',
  component: Main,
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./H5').default,
        require('./Program').default,
        require('./Apk').default
      ])
    })
  }
  
})
