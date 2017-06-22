import React from 'react'
import { Link } from 'react-router'
import s from './list-new.scss'
import { appType, PageTypes } from 'config/index'

class TabelItem extends React.Component {

  render () {
    const { type, data={}, add, del } = this.props;
    const { appId, appLogo, appName, appDesc, price,
       _appKindClassName, _appStatus,  } = data
    return (
      <tr>
        <td className={s.imgWrap}><img src={appLogo} alt='LOGO' /></td>
        <td className={s.appInfo}>
          <span className={s.name}>{appName}</span>
          <i className={`iconfont ${_appKindClassName}`} />
          <span className={s.desc}>{appDesc}</span>
        </td>

        <td className={s.price}>
          <span className={s.name}>{price || '免费'}</span>
        </td>
        <td className={s.status}>
          {_appStatus && _appStatus.map((v, index) => <div key={index} className={s.vStatus}>
            <span className={s.version}><i className={s.round} style={v.style}/>{v.codeVersion}</span>
            <span className={s.text}>{v.text}</span>
          </div>)}
        </td>

        <td className={s['btn-group']}>
          {!this.props.selected.find(v=> v.appId == appId) ? <a className={`btn-default ${s.action}`}
            onClick={()=>add({
              appId, appLogo, appName
            })}>选择</a> : 
          <a className={`btn-default ${s.action}`}
            onClick={()=>del({
              appId
            })}>取消选择</a>}
        </td>
      </tr>
    )
  }
}


export default TabelItem
