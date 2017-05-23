import React from 'react'
import s from './Complete-new.scss'
import cx from 'classnames'

const Submit = () => {
    return (
    	<div>
				<div className={s['success-wrapper']}>
					<div className={s.success}>
						<span className={s.img}></span>
						提交成功,等待审核
					</div>
					<p className={s['success-text']}>审核大概需要1周时间,请耐心等待,审核完成后,会以邮件的形式告知您,请您关注登录平台时的邮箱。或者您可以通过发送邮件,到bo@wanda.com.cn查询审核结果。</p>
					<span className={s['success-text']}>返回我的应用，关注审核状态。</span>
					<button className={`primaryBtn ${s['return-apply']}`}>查看我的应用</button>
				</div>
				
			</div>
    )
  }


export default Submit;