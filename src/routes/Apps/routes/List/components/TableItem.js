import React from 'react'
import { Link } from 'react-router'

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


export const TabelItem = ({ data, type }) => {
  const appStatus = getAppStatus(data)
  if(appStatus.length > 1 && appStatus[0].status === appStatus[1].status) {
    appStatus.pop()
  }

  return ( 
    <tr>
      <td className={s.imgWrap}><img src={data.appLogo} alt="LOGO"/></td>
      <td className={s.appInfo}>
        <span className={`${s.name} ${s.textOverflow}`}>{data.appName}</span>
      </td>

      <td className={s.price}>
        <span className={`${s.name} ${s.textOverflow}`}>{data.price || '免费'}</span>
      </td>
      <td className={s.status}>
        {appStatus.map((v, index) => <div key={index}>
          <span className={s.version}>{ v.codeVersion}</span>
          <span>{v.text}</span>
        </div>)}
      </td>
      
      <td className={s.actions}>
        <Link to={`/apps/detail/${data.appId}`} className={s.btn}>查看详情</Link>
        
        { showEditBtn(appStatus[0].status) ? 
          <Link to={`/apps/edit/${data.appId}`} className={s.btn}>编辑基本信息</Link> : null }

        { showEditBtn(appStatus[0].status) ? 
          <Link to={`/apps/edit/${data.appId}`} className={s.btn}>发布新版本</Link> : null }
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