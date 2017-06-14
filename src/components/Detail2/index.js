/**
 * Created by lizhuo on 2017/6/12.
 */
import React from 'react'
import { Link } from 'react-router'
import { Header } from './header'
import { Versions, Unapprove, AdminUnshelved, SaleRange } from './footer'
import './index.scss'

class AppsDetail extends React.Component {
  render () {
    /* 伪数据区 */
    const { data, activeCodeStatus, editUrl, onChangeRange, onClickPublish } = this.props,
      len = data && data.versions && data.versions.length
    /*
    * 根据消息code码分类模版
    * 0:准备提交 -- 不显示历史版本
    * 1:审核中
    * 2:等待开发者发布 -- 显示确认发布按钮
    * 3:审核不通过 -- 显示审核不通过原因
    * 4:准备提交 -- 显示历史版本
    * 5:已发布 -- 显示销售范围
    * 6:被管理员下架 -- 显示已下架及相应原因
    * 7:被开发者下架 -- 显示已下架及相应原因
    * */
    const map = {
      // 1:<div className="table-info radio-from"><Link to={editUrl}><button type="button" className="btn btn-primary">编辑</button></Link></div>,
      2: <div className='mar'>
           <button type='button' className='confirm-publish btn-primary' onClick={() => { onClickPublish() }}>确认发布</button>
         </div>,
      4: Versions(this.props),
      3: Unapprove(this.props),
      5: <SaleRange onChangeRange={onChangeRange} activeCodeStatus={activeCodeStatus}/>,
      6: AdminUnshelved(this.props),
      7: AdminUnshelved(this.props)
    }
    return (
      /* 渲染头部信息 */
      <div className='sub-container bg-white'>
        { data && data.mine === 1 && len > 0 && Header(this.props) }
        { BasicInfo(this.props) }
        { LatestVersion(this.props) }
        {/*渲染尾部信息*/}
        { data.mine === 1 ? map[activeCodeStatus] : ''}
      </div>
    )
  }
}
/* 版本信息函数 */
export const BasicInfo = (props) => {
  const {data, latestVersion, infoTags, showSize} = props
  let list = []
  if (data.mine && latestVersion.publishStatus === 0) {
    list = [...data.changes.tags]
  } else if (data.changes) {
    list = [...infoTags]
  }
  const len = list.length
  return (
    <div className='detail-container'>
      <div className='detail-download'>
        <img className='appImg'
             src={data.mine && latestVersion.publishStatus === 0 ? data.changes && data.changes.appLogo : data.appLogo}
             alt='LOGO'/>
        {/** data.mine == 1 ? '' : showSize
         ? <a className="btn btn-primary btn-download" href={ latestVersion.downloadUrl } target="_blank">下载</a>
         : <p className="btn btn-primary btn-download">使用</p>
         */}
      </div>
      <div className='detail-info'>
        <dl className='detail-tittle'>
          <dt>
            {data.mine && latestVersion.publishStatus === 0 ? data.changes && data.changes.appName : data.appName }
          </dt>
          {/* <dd><i className="user-img"></i><span>{data.developerName}</span></dd> */}
        </dl>
        <h3 className='app-title'>内容提要</h3>
        <p className='app-text'>
          { data.mine && latestVersion.publishStatus === 0 ? data.changes && data.changes.appDesc : data.appDesc}
        </p>
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
  )
}
/* 文件大小 */
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

/* 最后版本 */
export const LatestVersion = (props) => {

  const {latestVersion, showSize, data = {}, versionsAll = []} = props,
    defaultLayout = data.defaultLayout || {},
    styleObj = {
      width: defaultLayout.w * 50 + 'px',
      height: defaultLayout.h * 50 + 'px'
    },
    appType = {
      '0': 'FAP小程序',
      '1': 'HTML5',
      '2': 'APK'
    },
    appTypeText = {
      '1': '应用',
      '2': '组件'
    },
    {changes = {}} = data,
    screenSize = {
      '1': '手机端',
      '2': 'Pad端',
      '4': 'PC端'
    }
    /*
    * 建立版本信息变量
    * */
  const size = `${defaultLayout.w} * ${defaultLayout.h}`,
    publishVersion = latestVersion && latestVersion.publishStatus ? latestVersion : versionsAll[1],
    publishVersionBundleSize = data.appKind === 2 ? bundleSizeFixed(publishVersion && publishVersion.fileSize) : data.platform === 2 ? bundleSizeFixed(publishVersion && publishVersion.bundleSize2) : bundleSizeFixed(publishVersion && publishVersion.bundleSize),
    latestVersionBundleSize = data.appKind === 2 ? bundleSizeFixed(publishVersion && latestVersion.fileSize) : data.platform === 2 ? bundleSizeFixed(publishVersion && latestVersion.bundleSize2) : bundleSizeFixed(publishVersion && latestVersion.bundleSize),
    tableInfoMap = [
      {
        'title': '更新日期',
        'text': !data.mine ? publishVersion && publishVersion.codeUpdateTime : latestVersion.codeUpdateTime,
      },
      {
        'title': '版本',
        'text': !data.mine ? publishVersion && publishVersion.codeVersion : latestVersion.codeVersion
      },
      {
        'title': '大小',
        'text': !data.mine ? publishVersion && publishVersionBundleSize : latestVersionBundleSize
      },
      {
        'title': '版本介绍',
        'text': !data.mine ? ((publishVersion && publishVersion.codeDesc) || '暂无') : (latestVersion.codeDesc || '暂无')
      },
      {
        'title': appTypeText[data.appType] + '类型',
        'text': appType[data.appKind]
      }
    ]
  /*
  * 渲染版本信息模版
  * */
  return <div className='table-info'>
    <h3 className='app-title'>版本信息</h3>
    <ul className='detail-tableList'>
      <li className='item'>
        {tableInfoMap.map((index) => {
          return <div className="cell">
            <p className="title">{index.title}</p>
            <p className="text">{index.text}</p>
          </div>
        })}
        { +data.appKind === 1 && +data.appType === 1 && <div className='cell'>
          <p className='title'>使用场景</p>
          <p className='text'>{screenSize[latestVersion._screenSize]}</p>
        </div>}

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
              {data.appPreviewImage ? <img className='img' src={data.mine && latestVersion.publishStatus === 0 ? data.changes && data.changes.appPreviewImage : data.appPreviewImage} style={styleObj}/> : <p className='img-text'>加载中</p>}
            </div>
          </p>
        </div>
        }
      </li>
    </ul>
  </div>
}

export default AppsDetail
