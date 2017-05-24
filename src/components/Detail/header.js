import { Link } from 'react-router'

export const Header = (props) => {
  const { data, editUrl, onChangeVersion, latestVersion } = props
  const latestVersions = data && data.versions && data.versions[0] || {}
  latestVersion._screenSize = data.changes.screenSize
  const preVersions = data && data.versions && data.versions[1] || {}
  preVersions._screenSize = data.screenSize
  
  const len = data && data.versions && data.versions.length

  const latestCodeStatus = latestVersions && getCodeStatus(data, latestVersions)

  const preCodeStatus = preVersions && getCodeStatus(data, preVersions)

  const hidePreCode = (latestCodeStatus.codeStatus == 5 && preCodeStatus.codeStatus == 5) ||
                      (latestCodeStatus.codeStatus == 6 && preCodeStatus.codeStatus == 6) ||
                      (latestCodeStatus.codeStatus == 7 && preCodeStatus.codeStatus == 7)

  return data && data.mine === 1 && len > 0 && <div className='tab-nav'>
    <ul className='tab-list'>
      { (preCodeStatus.codeVersion && !hidePreCode) &&
      <li className={preCodeStatus.codeVersion == latestVersion.codeVersion && 'active' || ''}
        onClick={() => { onChangeVersion && onChangeVersion(preCodeStatus, preVersions) }}>
        <a>
        	<div className='text'>{preCodeStatus.codeVersion}</div>
        	<div className='text'>{preCodeStatus.codeStatusName}</div>
        </a>
      </li>
      }

      <li className={latestCodeStatus.codeVersion == latestVersion.codeVersion && 'active' || ''}
        onClick={() => { onChangeVersion && onChangeVersion(latestCodeStatus, latestVersions) }}>
        <a>
        	<div className='text'>{latestCodeStatus.codeVersion}</div>
        	<div className='text'>{latestCodeStatus.codeStatusName}</div>
        </a>
      </li>

    </ul>
  </div>
}
// { showCreate && <Link to={editUrl}><button className="btn btn-primary">创建新版本</button></Link> }
  // const showCreate = (latestCodeStatus &&
  //                    (latestCodeStatus.codeVersion == latestVersion.codeVersion) &&
  //                    latestCodeStatus.codeStatus == 5 || latestCodeStatus.codeStatus == 7)
export const getCodeStatus = (data, version) => {
  let versionInfo = {
    codeVersion: '',
    codeStatus: '',
    codeStatusName: ''
  }
  versionInfo.codeVersion = version && version.codeVersion
  if (data.adminUnshelved && version.publishStatus) {
    versionInfo.codeStatus = 6
    versionInfo.codeStatusName = '被管理员下架'
    return versionInfo
  }
  if (data.devUnshelved && version.publishStatus) {
    versionInfo.codeStatus = 7
    versionInfo.codeStatusName = '被开发者下架'
    return versionInfo
  }
  if (version.publishStatus) {
    versionInfo.codeStatus = 5
    versionInfo.codeStatusName = '已发布'
    return versionInfo
  } else if (version.reviewStatus === 0 || version.reviewStatus===4) {
    versionInfo.codeStatus = 1
    versionInfo.codeStatusName = '准备提交'
    return versionInfo
  } else if (version.reviewStatus === 1) {
    versionInfo.codeStatus = 2
    versionInfo.codeStatusName = '审核中'
    return versionInfo
  } else if (version.reviewStatus === 2) {
    versionInfo.codeStatus = 3
    versionInfo.codeStatusName = '等待开发者发布'
    return versionInfo
  } else if (version.reviewStatus === 3) {
    versionInfo.codeStatus = 4
    versionInfo.codeStatusName = '审核不通过'
    return versionInfo
  }
  return versionInfo
}
