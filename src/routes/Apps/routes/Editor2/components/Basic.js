import React from 'react'
import BreadCrumb from 'business/AppCreate/BreadCrumb'
import Tabs from 'business/AppCreate/Tabs'
import BasicForm from '../containers/BasicFormContainer'
import s from 'business/AppCreate/Basic-new.scss'
import { Link } from 'react-router'
import cx from 'classnames'
import HOC from '../../../hoc/create'
import Header from './Header'
import { APP_TYPES } from 'config/appTypes'


const Basic = (props) => {
  const { initialValues } = props;
  const { id } = props.params;
  const appType = Object.keys(APP_TYPES).find(v=>+APP_TYPES[v].value === +initialValues.appKind);

  return <div>
    <Header {...props}></Header>
    <div className={s.main}>
      <span className={s.tips}>
        <i className="iconfont icon-zhuyi"></i>
        您的这次更新会在新的应用版本发布后，在应用市场上显示。
      </span>
      <BasicForm {...props}></BasicForm>
    </div>
  </div>
}

export default HOC(Basic);
