import React, { Component } from 'react'
import { Link } from 'react-router'
import SideBar from 'business/SideBar'
import s from './index-new.scss'
import { PageTypes, getPageLinks } from 'config/index'

class DevTools extends Component {
  render() {
    return (
      <div className={`container`} >
        <SideBar pageLinks={getPageLinks('apps')} type={'apps'}></SideBar>
        <div className={s.content}>
          <h2 className={s.title}><i className="iconfont icon-tool"></i>开发者工具</h2>
          <div className={s.tool}>
          	<dl className={s.detail}>
	            <dt className={s.img}></dt>
	            <dd>
	                <h3 className={s.name}>开发者文档</h3>
	                <p className={s.text}>说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字</p>
	            </dd>
	          </dl>
	          <div className={s.btn}>
	            <Link to="/devtools/account">开发者账户</Link>
	            <Link to="/devtools/devinfo">开发密钥</Link>
	          </div>
          </div>
          <div className={s.tool}>
          	<dl className={s.detail}>
	            <dt className={s.img}></dt>
	            <dd>
	                <h3 className={s.name}>查看developerKey和developerSecret</h3>
	                <p className={s.text}>开放平台测试账号的介绍，后续补充文案。开放平台测试账号的介绍，后续补充文案。</p>
	            </dd>
	          </dl>
	          <div className={s.btn}>
	            <button className={s.look}>查看</button>
	          </div>
	          <div className={s.key}></div>
          </div>
          <div className={s.tool}>
          	<dl className={s.detail}>
	            <dt className={s.img}></dt>
	            <dd>
	                <h3 className={s.name}>查看开放平台测试账号</h3>
	                <p className={s.text}>说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字</p>
	            </dd>
	          </dl>
	          <div className={s.btn}>
	            <Link to="/devtools/account">开发者账户</Link>
	            <Link to="/devtools/devinfo">开发密钥</Link>
	          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DevTools
