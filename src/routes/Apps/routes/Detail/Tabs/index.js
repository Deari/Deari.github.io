import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'

const Tabs = () => {

	return (
		<div className="tabs">
			<ul className='tabs-titles'>
				<li className={`tabs-item active ${s.tabNav}`}>
					<span className={s['item-text']}>0.0.1</span>
					<span className={s['item-text']}>已发布</span>
				</li>
				<li className={`tabs-item ${s.tabNav}`}>
					<span className={s['item-text']}>0.0.2</span>
					<span className={s['item-text']}>准备提交</span>
				</li>
			</ul>
		</div>
  )
}

export default Tabs;