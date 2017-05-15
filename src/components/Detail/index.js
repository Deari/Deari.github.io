import React from 'react'
import { Link } from 'react-router'
import { Header } from 'components/Detail/header'
import { Versions, Unapprove, AdminUnshelved, SaleRange } from './footer'
import './index.scss'

class AppsDetail extends React.Component {
  render () {
    const { data, activeCodeStatus, editUrl, onChangeRange, onClickPublish } = this.props
    const len = data && data.versions && data.versions.length
    return (
      <div className='sub-container bg-white'>
        { data && data.mine == 1 && len > 0 && Header(this.props) }
        { BasicInfo(this.props) }
        { LatestVersion(this.props) }

        { data.mine == 1 && activeCodeStatus === 0 && Versions(this.props) }
        { data.mine == 1 && activeCodeStatus === 3 && <div className='mar'><button type='button' className='btn btn-primary' onClick={() => { onClickPublish() }}>确认发布</button></div> }
        { data.mine == 1 && activeCodeStatus === 4 && Unapprove(this.props) }
        { data.mine == 1 && activeCodeStatus === 5 && <SaleRange onChangeRange={onChangeRange} activeCodeStatus={activeCodeStatus} /> }
        { data.mine == 1 && activeCodeStatus === 6 && AdminUnshelved(this.props) }
        { data.mine == 1 && activeCodeStatus === 7 && <SaleRange onChangeRange={onChangeRange} activeCodeStatus={activeCodeStatus} /> }

      </div>
    )
  }
}
//        { data.mine == 1 && activeCodeStatus === 1 && <div className="table-info radio-from"><Link to={editUrl}><button type="button" className="btn btn-primary">编辑</button></Link></div> }
export const BasicInfo = (props) => {
  const { data, latestVersion, infoTags, showSize } = props
  let list = []
  if (data.mine && latestVersion.publishStatus == 0) {
    list = [...data.changes.tags]
  } else {
    if (data.changes) {
      list = [...infoTags]
    }
  }
  const len = list.length
  return <div className='detail-container'>
    <div className='detail-download'>
      <img className='appImg' src={data.mine && latestVersion.publishStatus == 0 ? data.changes && data.changes.appLogo : data.appLogo} alt='LOGO' />
      {/** data.mine == 1 ? '' : showSize
        ? <a className="btn btn-primary btn-download" href={ latestVersion.downloadUrl } target="_blank">下载</a>
        : <p className="btn btn-primary btn-download">使用</p>
      */}
    </div>
    <div className='detail-info'>
      <dl className='detail-tittle'>
        <dt>{data.mine && latestVersion.publishStatus == 0 ? data.changes && data.changes.appName : data.appName }</dt>
        {/* <dd><i className="user-img"></i><span>{data.developerName}</span></dd> */}
      </dl>
      <h3 className='app-title'>内容提要</h3>
      <p className='app-text'>{ data.mine && latestVersion.publishStatus == 0 ? data.changes && data.changes.appDesc : data.appDesc}</p>
      <h3 className='app-title'>信息</h3>
      <table className='infomation-list'>
        {/**  <tr>
          <td>类别</td>
          <td>
            <span className="tag">{ data.categoryName }</span>
          </td>
        </tr> */}
        <tr>
          <td>标签</td>
          <td>
            {
            list.map((item, index) => {
              return (
                <span className='tag'>{item.tagName}{ (index < len - 1) ? `、` : '' }</span>
              )
            })
          }
          </td>
        </tr>
      </table>
    </div>
  </div>
}
const bundleSizeFixed = (bundleSize) => {
  if (!bundleSize) {
    bundleSize = 0
  }
  const KBSize = bundleSize / 1024
  const MBSize = bundleSize / 1024 / 1024
  if (MBSize < 1) {
    return Math.round(KBSize) + 'KB'
  } else {
    return Math.round(MBSize) + 'MB'
  }
}
export const LatestVersion = (props) => {
  const { latestVersion, showSize, data, versionsAll = [] } = props
  const defaultLayout = data.defaultLayout || {}
  const styleObj = {
    width:defaultLayout.w * 50 + 'px',
    height:defaultLayout.h * 50 + 'px'
  }
  const size = `${defaultLayout.w} * ${defaultLayout.h}`
  const publishVersion = latestVersion && latestVersion.publishStatus ? latestVersion : versionsAll[1]
  const publishVersionBundleSize = data.appKind == 2 ?
  bundleSizeFixed(publishVersion && publishVersion.fileSize) :
  data.platform === 2 ?
  bundleSizeFixed(publishVersion && publishVersion.bundleSize2) : bundleSizeFixed(publishVersion && publishVersion.bundleSize)
  const latestVersionBundleSize = data.appKind == 2 ?
  bundleSizeFixed(publishVersion && latestVersion.fileSize) :
  data.platform === 2 ?
  bundleSizeFixed(publishVersion && latestVersion.bundleSize2) : bundleSizeFixed(publishVersion && latestVersion.bundleSize)
  return <div className='table-info'>
    <h3 className='app-title'>版本信息</h3>
    <ul className='detail-tableList'>
      <li className='item'>
        <div className='cell'>
          <p className='title'>更新日期</p>
          <p className='text'>{!data.mine ? publishVersion && publishVersion.codeUpdateTime : latestVersion.codeUpdateTime}</p>
        </div>
        <div className='cell'>
          <p className='title'>版本</p>
          <p className='text'>{!data.mine ? publishVersion && publishVersion.codeVersion : latestVersion.codeVersion}</p>
        </div>
        { showSize &&
          <div className='cell'>
            <p className='title'>大小</p>
            <p className='text'>{!data.mine ? publishVersion && publishVersionBundleSize : latestVersionBundleSize }</p>
          </div>
        }
        <div className='cell'>
          <p className='title'>版本介绍</p>
          <p className='text'>{!data.mine ? publishVersion && publishVersion.codeDesc : latestVersion.codeDesc}</p>
        </div>
        { !showSize &&
          <div className='cell'>
            <p className='title'>组件尺寸</p>
            <p className='text'>{ size }</p>
          </div>
        }
        { !showSize &&
          <div className='cell'>
            <p className='title'>预览图</p>
            <p className='text'>
              <div className='img-block'>
                {data.appPreviewImage ? <img className='img' src={data.mine && latestVersion.publishStatus == 0 ? data.changes && data.changes.appPreviewImage : data.appPreviewImage} style={styleObj} /> : <p className='img-text'>加载中</p>}
              </div>
            </p>
          </div>
        }
      </li>
    </ul>
  </div>
}

export default AppsDetail
