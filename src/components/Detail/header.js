import { Link } from 'react-router'

export const Header = (props) => {
  const { data, createUrl, onChangeVersion, activeCodeVersion } = props
  const latestVersions = data && data.versions && data.versions[0] || {}
  const preVersions = data && data.versions && data.versions[1] || {}

  const latestCodeStatus = latestVersions && getCodeStatus(data, latestVersions)
  const preCodeStatus = preVersions && getCodeStatus(data, preVersions)

  const showCreate = (latestCodeStatus && (latestCodeStatus.codeVersion == activeCodeVersion) && latestCodeStatus.codeStatus == 5) ||
        ((preCodeStatus && preCodeStatus.codeVersion == activeCodeVersion) && preCodeStatus.codeStatus == 5) ? true : false

  return <div>
    <ul>
      { (!preCodeStatus || (latestCodeStatus.codeStatus == 5 && preCodeStatus.codeStatus == 5)) ? '' :
        <li className={preCodeStatus.codeVersion == activeCodeVersion && 'active'} 
            onClick={() => {onChangeVersion && onChangeVersion(preCodeStatus.codeVersion)}}>
          <div>{preCodeStatus.codeVersion}</div>
          <div>{preCodeStatus.codeStatusName}</div>
        </li>
      }
      <li className={latestCodeStatus.codeVersion == activeCodeVersion && 'active'}
          onClick={() => {onChangeVersion && onChangeVersion(latestCodeStatus.codeVersion)}}>
        <a>
          <div>{latestCodeStatus.codeVersion}</div>
          <div>{latestCodeStatus.codeStatusName}</div>
        </a>
      </li>
    </ul>
    { showCreate && <Link to={createUrl}><button>发布新版本</button></Link> }
    <hr/>
  </div>
}

export const getCodeStatus = (data, version) => {
  let versionInfo = {
    codeVersion: '',
    codeStatus: '',
    codeStatusName: ''
  }
  versionInfo.codeVersion = version && version.codeVersion
  if (data.adminUnshelved) {
    versionInfo.codeStatus = 6
    versionInfo.codeStatusName = "被管理员下架"
    return versionInfo
  }
  if (data.devUnshelved) {
    versionInfo.codeStatus = 7
    versionInfo.codeStatusName = "被开发者下架"
    return versionInfo
  }
  if (version.publishStatus) {
    versionInfo.codeStatus = 5
    versionInfo.codeStatusName = "已发布"
    return versionInfo
  } else if (version.reviewStatus === 0) {
    versionInfo.codeStatus = 1
    versionInfo.codeStatusName = "等待提交"
    return versionInfo
  } else if (version.reviewStatus === 1) {
    versionInfo.codeStatus = 2
    versionInfo.codeStatusName = "审核中"
    return versionInfo
  } else if (version.reviewStatus === 2) {
    versionInfo.codeStatus = 3
    versionInfo.codeStatusName = "审核不通过"
    return versionInfo
  } else if (version.reviewStatus === 3) {
    versionInfo.codeStatus = 4
    versionInfo.codeStatusName = "等待开发者发布"
    return versionInfo
  }
  return versionInfo
}
