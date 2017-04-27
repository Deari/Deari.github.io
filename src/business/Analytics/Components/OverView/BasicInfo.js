import React from 'react'
import s from './index-new.scss'

const BasicInfo = (props) => {
  return (
    <div className={s.detailBox}>
      <img src={props.appLogo} alt={props.appName} />
      <div className={s.info}>
        <h2>{props.appName}</h2>
        
        <h3 className={s.title}>内容提要</h3>
        <p className={s.text}>
          {props.appDesc}
        </p>
      </div>
    </div>
  )
}

export default BasicInfo