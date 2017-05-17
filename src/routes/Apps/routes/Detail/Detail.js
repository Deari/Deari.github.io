import React from 'react'
import moment from 'moment'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import { getDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'
import Tabs from './Tabs'
import s from './index-new.scss'

// import Detail from 'components/Detail'

class AppsDetail extends React.Component {

  render () {
    return (
      <div className='container'>
        <SideBar pageLinks={getPageLinks('apps')} type={'apps'} />
        <div className="content">
        	<Tabs></Tabs>
          <div className={s.main}>
          	<div className={s['detail-wrapper']}>
				  		<img src="http://img1.ffan.com/T1ELYTBQWv1RCvBVdK" alt=""className={s.img}/>
				  		<div className={s.appInfo}>
				  			<h2 className={s.title}>h5数据测试516-01</h2>
				  			<dl className={s['list-wrapper']}>
				  				<dt className={s['list-title']}>内容提要</dt>
				  				<dd className={s['con-wrapper']}>请上传应用高清图片400*400像素，仅支持PNG格式，大小不超过300KB</dd>
				  			</dl>
				  			<dl className={s['list-wrapper']}>
				  				<dt className={s['list-title']}>信息</dt>
				  				<dd className={s['con-wrapper']}>
				  					<span className={s.list}>
				  						<span className={s.item}>标签</span>
				  						<span className={`${s.item} ${s.text}`}>数据分析</span>
				  					</span>
				  				</dd>
				  			</dl>
				  		</div>
						</div>  
						<div className={`${s['publish-wrapper']} ${s['list-wrapper']}`}>
				  		<h3 className={s['list-title']}>版本信息</h3>
			  			<ul className={s['con-wrapper']}>
				  			<li className={s.list}>
				  				<span className={s.item}>更新版本</span>
				  				<span className={`${s.item} ${s['publish-text']}`}>2017-05-16 11:11:6</span>
				  			</li>
				  			<li className={s.list}>
				  				<span className={s.item}>版本</span>
				  				<span className={`${s.item} ${s['publish-text']}`}>0.0.1</span>
				  			</li>
				  		</ul>
				  	</div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppsDetail
