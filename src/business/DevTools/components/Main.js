import React, { Component } from 'react'
import { Link } from 'react-router'
import SideBar from 'business/SideBar'
import DevInfo from 'business/DevInfo'
import s from './index-new.scss'
import { PageTypes, getPageLinks } from 'config/index'

class DevTools extends Component {
  render() {
    const { type } = this.props;
    return (
      <div className={`container`} >
        <SideBar pageLinks={getPageLinks(type)} type={type}></SideBar>
        <div className={s.content}>
          <h2 className={`${s['content-header']}`}><i className="iconfont icon-tool"></i>开发者工具</h2>
          <div className={s.tool}>
          	<dl className={s.detail}>
	            <dt className={s.img}></dt>
	            <dd className={s.main}>
	                <h3 className={s.name}>开发者文档</h3>
	                <p className={s.text}>
                    后续补充文案。
                  </p>
	            </dd>
	          </dl>
	          <div className={`${s['btn-blue']}`}>
	            <Link to={`/${type}/doc`}>点击进入</Link>
	          </div>
          </div>
          <div className={s.tool}>
          	<dl className={s.detail}>
	            <dt className={s.img}></dt>
	            <dd className={s.main}>
	                <h3 className={s.name}>查看developerKey和developerSecret</h3>
	                <p className={s.text}>后续补充文案。</p>
	            </dd>
	          </dl>
	          <div className={`${s['btn-blue']}`}>
	            <Link to={`/${type}/list`} className={s.look}>点击进入</Link>
	          </div>
            <div className={s.key}>
            	<DevInfo devKe={'xxxxx'} devSecret={'xxxxxx'}></DevInfo>
            </div>
          </div>
          <div className={s.tool}>
          	<dl className={s.detail}>
	            <dt className={s.img}></dt>
	            <dd className={s.main}>
	                <h3 className={s.name}>查看开放平台测试账号</h3>
	                <p className={s.text}>后续补充文案。</p>
	            </dd>
	          </dl>
	          <div className={`${s['btn-blue']}`}>
	            <Link to={`/${type}/account`}>点击进入</Link>
	          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DevTools
