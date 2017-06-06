import React from 'react'
import BasicForm from '../containers/BasicFormContainer'
import BasicHOC from '../../../hoc/create'
import { IndexLink, Link } from 'react-router'
import s from 'business/AppCreate/Basic-new.scss'
import Tab from './Tab'

const Basic = (props) => {
  const { id, type } = props.params;

  return <div>
    <Tab id={id}></Tab>
    <div className={s.main}>
      <span className={s.tips}>
        <i className="iconfont icon-zhuyi"></i>
        您的这次更新会在新的组件版本发布后，在组件市场上显示。
      </span>
      <BasicForm {...props}></BasicForm>
    </div>
  </div>
}

export default BasicHOC(Basic);