/**
 * Created by lizhuo on 2017/6/12.
 */
import { Link } from 'react-router'
import { judgeAppStatus } from 'config/appStatus'

export const Header = (props) => {
  let
    { data, editUrl, onChangeVersion, latestVersion } = props,
    /*
    * getAppStatus => Function 根据props获取组建的版本信息
    * appStatus => Array 调用getAppStatus的返回值
    * latesVersions , preVersions => Object 包含版本号和相应文本的对象
    * */

    getAppStatus =  (app) => {
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
    },
    appStatus = getAppStatus(data),
    latestVersions = appStatus[0],
    preVersions = appStatus[1],
    len = appStatus.length,
    hidePreCode = [...5,6,7] === latestVersions.codeVersion === preVersions.codeVersion;
  if (appStatus.length > 1 && appStatus[0].status === appStatus[1].status) {
    appStatus.pop()
  }

  return (
    /*
    * 根据知否未开发者来渲染相应头部信息模版
    * */
    data && data.mine === 1 && len > 0 &&
    <div className='tab-nav'>
      <ul className='tab-list'>
        { (preVersions.codeVersion && !hidePreCode) &&
        <li className={preVersions.codeVersion === latestVersion.codeVersion && 'active' || ''}
          onClick={() => { onChangeVersion && onChangeVersion(preVersions, data.versions[1]) }}>
          <a>
            <div className='text'>{preVersions.codeVersion}</div>
            <div className='text'>{preVersions.text}</div>
          </a>
        </li>
        }
        <li className={latestVersions.codeVersion === latestVersion.codeVersion && 'active' || ''}
          onClick={() => { onChangeVersion && onChangeVersion(latestVersions, data.versions[0]) }}>
          <a>
            <div className='text'>{latestVersions.codeVersion}</div>
            <div className='text'>{latestVersions.text}</div>
          </a>
        </li>
      </ul>
    </div>
  )
}
