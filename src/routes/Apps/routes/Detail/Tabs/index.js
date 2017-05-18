import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'

const Tabs = () => {

	return (
		<div className={s.tabs}>
			<ul className={s['tabs-titles']}>
				<li className={`tabs-item active ${s.tabNav}`}>
					<span className={s['tabs-content']}>0.0.1</span>
					<span className={s['tabs-content']}>已发布</span>
				</li>
				<li className={`tabs-item ${s.tabNav}`}>
					<span className={s['tabs-content']}>0.0.2</span>
					<span className={s['tabs-content']}>准备提交</span>
				</li>
			</ul>
		</div>
  )
}

export default Tabs;