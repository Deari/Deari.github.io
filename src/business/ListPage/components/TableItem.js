import React from 'react'
import { Link } from 'react-router'
import { appType } from 'config/index'
import { judgeAppStatus } from 'config/appStatus'
import s from './table-new.scss'
import cx from 'classnames'
import { getDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'

class TabelItem extends React.Component {
  state = {
    data: this.props.data
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      data: newProps.data
    })
  }
  
  publish(appId) {
    const url = getDomain(`/app/v1/bo/v1/web/developer/app/${appId}/publish`)
    fetchUtil.postJSON(url, { onLine: 1 }).then(data => {
      console.log("发布成功", data)
      alert("发布成功！")
      const _v = this.state.data.versions[0]
      _v.publishStatus = 1

      this.setState({
        data: {
          ...this.state.data,
          versions: [_v]
        }
      })
    }).catch(e => {
      alert(`发布失败（错误码：${e.status}）`)
    })
  }

  shelve (appId) {
    const url = getDomain(`/app/v1/bo/v1/web/developer/shelveApp/${appId}`)
    fetchUtil.getJSON(url, { operation: 'shelve' }).then(data => {
      console.log("上架成功", data)
      alert("上架成功！")
      this.setState({
        data: {
          ...this.state.data,
          devUnshelved: 0
        }
      })
    }).catch(e => {
      alert(`上架成功（错误码：${e.status}）`)
    })
  }

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
    return status !== 'reviewing' && status !== 'waitPublish' && status !== 'devUnshelved'
  }
  showPublishBtn (status) {
    return status === 'waitPublish'
  }

  showUpBtn (status) {
    return status === 'devUnshelved'
  }
  
  render () {
    const { data } = this.state;
    const { type } = this.props;
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
          <Link to={`/${type}/detail/${data.appId}`} className={`defaultBtn ${s.tableBtn}`}>查看</Link>

          { this.showEditBtn(appStatus[0] && appStatus[0].status) ?
            <Link to={`/${type}/edit/${data.appId}`} className={`defaultBtn ${s.tableBtn}`}>编辑新版本</Link> : null }

          {this.showPublishBtn(appStatus[0] && appStatus[0].status) ? 
            <span className={`defaultBtn ${s.tableBtn}`} onClick={()=>this.publish(data.appId)}>发布到线上</span> : null }

          { this.showUpBtn(appStatus[0] && appStatus[0].status) ? 
          <span className={`defaultBtn ${s.tableBtn}`} onClick={()=>this.shelve(data.appId)}>上  架</span> : null }
        </td>
      </tr>
    )
  }
}


export default TabelItem
