import React from 'react'
import BasicForm from '../containers/BasicFormContainer'
import s from 'business/AppCreate/Basic-new.scss'
import BasicHOC from '../../../hoc/create'

const Basic = (props) => {
  return <div>
    <h2 className={s.pageTitle}>基本信息</h2>
    <div className={s.main}>
      <BasicForm {...props}></BasicForm>
    </div>
  </div>
}

export default BasicHOC(Basic);
