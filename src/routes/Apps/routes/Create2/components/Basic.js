import React from 'react'
import BreadCrumb from 'business/AppCreate/BreadCrumb'
import BasicForm from 'business/AppCreate/Form'
import s from 'business/AppCreate/Basic-new.scss'

const Basic = (props) => {
  return <div>
    <div className={s.breadcrumb}>
      <a className="iconfont icon-fanhui" href="/apps/list"></a>
      <span className={s.site}>我的应用</span>
      <span className={`${s.site} ${s.noNext}`}>创建新应用 ( {props.appType} 类型 )</span>
    </div>
    <h2 className={s.pageTitle}>基本信息</h2>
    <div className={s.main}>
      <BasicForm {...props}></BasicForm>
    </div>
  </div>
}

export default Basic;
