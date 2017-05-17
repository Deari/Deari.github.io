import React from 'react'
import { Link } from 'react-router'
import { appType } from 'config/index'
import { judgeAppStatus } from 'config/appStatus'
import s from './table-new.scss'
import cx from 'classnames'

class TabelItem extends React.Component {
  getAppStatus (app) {
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

  showEditBtn (status) {
    return status !== 'reviewing' && status !== 'waitPublish'
  }
  showPublishBtn (status) {
    return status === 'waitPublish'
  }

  showUpBtn (status) {
    return status === 'devUnshelved'
  }
  
  render () {
    const { data, type } = this.props;
    const appStatus = this.getAppStatus(data)
    if (appStatus.length > 1 && appStatus[0].status === appStatus[1].status) {
      appStatus.pop()
    }

    return (
      <tr>
        <td className={s.imgWrap}><img src={data.appLogo} alt='LOGO' /></td>
        <td className={s.appInfo}>
          <span className={s.name}>{data.appName}</span>
          <i className={cx('iconfont', appType[data.appKind])} />
          <span className={s.desc}>{data.appDesc}</span>
          <span className={s.appId}>AppID: {data.appId}</span>
        </td>

        <td className={s.price}>
          <span className={s.name}>{data.price || '免费'}</span>
        </td>
        <td className={s.status}>
          {appStatus.map((v, index) => <div key={index} className={s.vStatus}>
            <span className={s.version}><i className={s.round} style={v.style}/>{v.codeVersion}</span>
            <span className={s.text}>{v.text}</span>
          </div>)}
        </td>

        <td className={s.actions}>
          <Link to={`/${type}/detail/${data.appId}`} className={`defaultBtn ${s.tableBtn}`}>查  看</Link>

          { this.showEditBtn(appStatus[0] && appStatus[0].status) ?
            <Link to={`/${type}/edit/${data.appId}/1`} className={`defaultBtn ${s.tableBtn}`}>编  辑</Link> : null }

          {this.showPublishBtn(appStatus[0] && appStatus[0].status) ? 
            <span className={`defaultBtn ${s.tableBtn}`}>发布到线上</span> : null }

          { this.showUpBtn(appStatus[0] && appStatus[0].status) ? 
          <span className={`defaultBtn ${s.tableBtn}`}>上  架</span> : null }
        </td>
      </tr>
    )
  }
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
