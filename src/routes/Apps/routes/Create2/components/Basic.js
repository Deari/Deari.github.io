import React from 'react'
import BasicForm from '../containers/FormContainer'
import s from 'business/AppCreate/Basic-new.scss'
import HOC from '../../../Hoc/create'

const Basic = (props) => {
  const { appType } = props;
  return <div>
    <div className={s.breadcrumb}>
      <a className="iconfont icon-fanhui" href="/apps/list"></a>
      <span className={s.site}>我的应用</span>
      <span className={`${s.site} ${s.noNext}`}>创建新应用 ( {appType.text} 类型 )</span>
    </div>
    <h2 className={s.pageTitle}>基本信息</h2>
    <div className={s.main}>
      <BasicForm {...props}></BasicForm>
    </div>
  </div>
}

export default HOC(Basic);
