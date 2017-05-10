import React from 'react'
import { Link } from 'react-router'
import { appType } from 'config/index'
import { judgeAppStatus } from 'config/appStatus'
import s from './table-new.scss'
import cx from 'classnames'

function  getAppStatus (app) {
  const { versions, adminUnshelved, devUnshelved } = app
  return versions.slice(0, 2).map((v) => {
    const vInfo = judgeAppStatus({
      adminUnshelved, 
      devUnshelved, 
      publishStatus: v.publishStatus, 
      reviewStatus: v.reviewStatus  
    })
    return {
      ...vInfo,
      codeVersion: v.codeVersion
    }
  })
}

function showEditBtn (status) {
  return status !== 'reviewing' && status !== 'waitPublish'
}


const TabelItem = ({ data, type }) => {
  const appStatus = getAppStatus(data)
  if(appStatus.length > 1 && appStatus[0].status === appStatus[1].status) {
    appStatus.pop()
  }

  return ( 
    <tr>
      <td className={s.imgWrap}><img src={data.appLogo} alt="LOGO"/></td>
      <td className={s.appInfo}>
        <span className={`${s.name} ${s.textOverflow}`}>{data.appName}</span>
        <span className={`${s.desc}`}>{data.appDesc}</span>
        <span className={`${s.appId} ${s.textOverflow}`}>AppID: {data.appId}</span>
        <i className={cx('iconfont', appType[data.appKind])}></i>
      </td>

      <td className={s.price}>
        <span className={`${s.name} ${s.textOverflow}`}>{data.price || '免费'}</span>
      </td>
      <td className={s.status}>
        {appStatus.map((v, index) => <div key={index} className={s.vStatus}>
          <span className={s.version}><i className={s.round} style={v.style}></i>{ v.codeVersion}</span>
          <span className={s.text}>{v.text}</span>
        </div>)}
      </td>
      
      <td className={s.actions}>
        <Link to={`/${type}/detail/${data.appId}`} className={s.btn}>查看详情</Link>
        
        { showEditBtn(appStatus[0] && appStatus[0].status) ? 
          <Link to={`/${type}/edit/${data.appId}/1`} className={s.btn}>编辑基本信息</Link> : null }

        { showEditBtn(appStatus[0] && appStatus[0].status) ? 
          <Link to={`/${type}/edit/${data.appId}/3`} className={s.btn}>发布新版本</Link> : null }
      </td>
    </tr>
  )
}

TabelItem.defaultProps = {
  data: {
    appLogo: '--',
    appName: '--',
    appDesc: '--',
    appId: '--'
  }
}

export default TabelItem