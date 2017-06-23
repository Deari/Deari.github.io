import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import s from 'business/AppCreate/Complete-new.scss'

const Submit = ({ params }) => {
    return (
    	<div className="content">
				<div className={s['success-wrapper']}>
					<div className={s.success}>
						<span className={s.img}></span>
						提交成功,等待审核
					</div>
					<p className={s['success-text']}>审核大概需要1周时间,请耐心等待,审核完成后,会以邮件的形式告知您,请您关注登录平台时的邮箱。或者您可以通过发送邮件,到bo@wanda.com.cn查询审核结果。</p>
					<span className={s['success-text']}>返回我的组件，关注审核状态。</span>
          <Link to={`/widgets/list`} className={`btn-primary ${s.viewBtn}`}>查看我的组件</Link>
				</div>
			</div>
    )
  }


export default Submit;