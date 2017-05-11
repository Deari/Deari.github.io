import React, { Component } from 'react'
import { Link } from 'react-router'
import SideBar from 'business/SideBar'
import DevInfo from 'business/DevInfo'
import s from './index-new.scss'
import { PageTypes, getPageLinks } from 'config/index'
import cx from 'classnames'

class DevTools extends Component {
  state = {
    showDevInfo: false
  }

  handleClick () {
    this.setState({ showDevInfo: !this.state.showDevInfo })
  }

  
  render() {
    const { type } = this.props;
    const { showDevInfo } = this.state;

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
	            <Link to={`/${type}/doc`}>点击查看</Link>
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
	            <span onClick={::this.handleClick} className={s.look}>点击{ showDevInfo ? '收起' : '查看' }</span>
	          </div>
            <div className={cx(s.key, { [s.active]: showDevInfo }) }>
            	<DevInfo></DevInfo>
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
	            <Link to={`/${type}/account`}>点击查看</Link>
	          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DevTools
