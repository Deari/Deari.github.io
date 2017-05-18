import React from 'react'
import t from './Basic-new.scss'
import cx from 'classnames'

const Submit = () => {
    return (
    	<div>
				<h2 className={t.breadcrumb}>
	        <a className="iconfont icon-fanhui" href="/apps/list"></a>
	        <span className={t.site}>我的应用</span>
	        <span className={`${t.site} ${t.noNext}`}>创建新应用 ( H5 类型 )</span>
	      </h2>
	      
				<div className={t['success-wrapper']}>
					<div className={t.success}>
						<span className={t.img}></span>
						提交成功,等待审核
					</div>
					<p className={t['success-text']}>审核大概需要1周时间,请耐心等待,审核完成后,会以邮件的形式告知您,请您关注登录平台时的邮箱。或者您可以通过发送邮件,到bo@wanda.com.cn查询审核结果。</p>
					<span className={t['success-text']}>返回我的应用，关注审核状态。</span>
					<button className={`primaryBtn ${t['return-apply']}`}>查看我的应用</button>
				</div>
				
			</div>
    )
  }


export default Submit;