import React from 'react'
import t from './Basic-new.scss'
import s from './Alert-new.scss'

const Alert = () => {
	return(
		<div className={s['alert-wrapper']}>
				<div className={s.content}></div>
		</div>
	)
}

export default Alert;
