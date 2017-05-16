import React from 'react'
import moment from 'moment'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import { getDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'
import Tags from './Tags'
import s from './index-new.scss'

// import Detail from 'components/Detail'

class AppsDetail extends React.Component {

  render () {
    return (
      <div className='container'>
        <SideBar pageLinks={getPageLinks('apps')} type={'apps'} />
        <div className="content">
        	<Tags></Tags>
          <div className={s.main}>
          	<div className={s['detail-wrapper']}>
				  		<img src="http://img1.ffan.com/T1ELYTBQWv1RCvBVdK" alt=""className={s.img}/>
				  		<div className={s.appInfo}>
				  			<h2 className={s.title}>h5数据测试516-01</h2>
				  			<dl className={s.tips}>
				  				<dt className={s['tips-title']}>内容提要</dt>
				  				<dd className={s['con-wrapper']}>请上传应用高清图片400*400像素，仅支持PNG格式，大小不超过300KB</dd>
				  			</dl>
				  			<dl className={s.tips}>
				  				<dt className={s['tips-title']}>信息</dt>
				  				<dd className={s['con-wrapper']}>
				  					<span className={s.list}>
				  						<span className={s.item}>标签</span>
				  						<span className={`${s.item} ${s.text}`}>数据分析</span>
				  					</span>
				  				</dd>
				  			</dl>
				  		</div>
						</div>  
						<div className={s['publish-wrapper']}>
				  		<h3>版本信息</h3>
				  		<dl>
				  			<dt></dt>
				  			<dd></dd>
				  		</dl>
				  	</div>
          </div>
        </div>
      </div>
    )
  }
}

export default AppsDetail
