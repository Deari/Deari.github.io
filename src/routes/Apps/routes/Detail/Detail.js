import React from 'react'
import moment from 'moment'

import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks } from 'config/index'
import { getEnvDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'

import Detail from 'components/Detail'

class AppsDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      tags: [],
      versions: [],
      currentCode: '',
      activeCodeVersion: '',
      activeCodeStatus: 0,
      showAll: false
    }
  }

  componentDidMount () {
    const id = this.props.params.id
    const url = getEnvDomain() + `/app/v1/bo/v1/web/developer/app/${id}`
    fetchUtil.getJSON(url).then(data => {
      console.log(data)
      this.formatData(data)
    }).catch(e=>{
      console.log("获取详情接口返回错误", e)
    })
  }

  formatTime (times) {
    return times ? moment(times * 1000).format("YYYY-MM-DD H:m:s") : '--'
  }

  getLatestVersionStatus(data, currentCode) {
    if (!data || data.mine == 0) return 0
    if (currentCode) {
      const codeStatus = this.getCodeStatus(data, currentCode).codeStatus
      return codeStatus
    }
  }

  getCodeStatus (data, version) {
   
    let versionInfo = {
      codeVersion: '',
      codeStatus: '',
      codeStatusName: ''
    }
    versionInfo.codeVersion = version && version.codeVersion
    if (data.adminUnshelved && version.publishStatus) {
      versionInfo.codeStatus = 6
      versionInfo.codeStatusName = "被管理员下架"
      return versionInfo
    }
    if (data.devUnshelved && version.publishStatus) {
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
      versionInfo.codeStatusName = "准备提交"
      return versionInfo
    } else if (version.reviewStatus === 1) {
      versionInfo.codeStatus = 2
      versionInfo.codeStatusName = "审核中"
      return versionInfo
    } else if (version.reviewStatus === 2) {
      versionInfo.codeStatus = 3
      versionInfo.codeStatusName = "等待开发者发布"
      return versionInfo
    } else if (version.reviewStatus === 3) {
      versionInfo.codeStatus = 4
      versionInfo.codeStatusName = "审核不通过"
      return versionInfo
    }
    return versionInfo
  }

  formatData(data) {
    ['updateTime', 'createTime'].forEach(v=>{
      this.formatTime(data[v])
    })

    const { versions=[] } = data
    versions.forEach(item => {
      item.codeUpdateTime = this.formatTime(item.codeUpdateTime)
    })

    const activeCodeStatus = this.getLatestVersionStatus(data, versions[0])
    
    this.setState({
      data, 
      activeCodeStatus, 
      currentCode: versions[0],
      versions: versions[1]||[]
    })
  }

  changeShowAll() {
    const { data } = this.state
    const showAll = !this.state.showAll
    const fistHistory = data.versions.slice(1, 2) || []
    const histories = data.versions.slice(1) || []
    showAll 
      ? this.setState({versions: histories, showAll: showAll}) 
      : this.setState({versions: fistHistory, showAll: showAll})
  }

  changeRange(operation) {
    const { activeCodeStatus } = this.state
    if ((activeCodeStatus === 5 && operation == 'shelve') ||
       (activeCodeStatus === 7 && operation == 'unshelve')) return
    let id = this.props.params.id;
    let apiUrl = getDomain(`web/developer/shelveApp/${id}?operation=${operation}`);
    fetchUtil.getJSON(apiUrl).then((res) => {
      if (res && res.status === 200) {
        debug.warn("操作成功")
        this.getInfo()
      } else {
        debug.warn("操作失败")
      }
    }).catch(e => {
      debug.warn("网络错误")
    })
  }

  changeVersionBtn(code, version) {
    const { currentCode } = this.state
    if (code.codeVersion == currentCode.codeVersion) return
    code && this.setState({
      currentCode: version,
      activeCodeStatus: code.codeStatus
    })
  }

  clickPublish() {
    const { data } = this.state
    const appId = data && data.appId
    const formData = new FormData()
    formData.append("onLine", 1)

    let apiUrl = getDomain(`web/developer/app/${appId}/publish`);
    fetchUtil.postJSON(apiUrl, formData, {jsonStringify: false}).then(res => {
      if (res.status === 200) {
        debug.warn("发布成功")
        this.getInfo()
      } else {
        debug.warn("发布失败")
      }
    }).catch(e => {
      debug.warn('网络错误')
    })
  }

  render() {
    const { data, tags, versions, showAll, currentCode, activeCodeStatus } = this.state
    const infoTags = data.tags || []
    const latestVersion = currentCode || {}
    const showSize = true
    const versionsAll = data.versions
    const id = this.props.params.id
    const editUrl = `/apps/edit/${id}`
    const createUrl = `/apps/create`

    return (
      <div className="container">
        <SideBar pageLinks={getPageLinks('apps')} type={'apps'} />
        <Detail data={data} latestVersion={latestVersion} infoTags={infoTags} versions={versions} 
                showAll={showAll} showSize={showSize} editUrl={editUrl} createUrl={createUrl} 
                onChangeShowAll={this.changeShowAll.bind(this)} onChangeRange={this.changeRange.bind(this)} 
                onChangeVersion={this.changeVersionBtn.bind(this)} 
                activeCodeStatus={activeCodeStatus} onClickPublish={this.clickPublish.bind(this)} versionsAll={versionsAll}/>
      </div>
    )
  }
}

export default AppsDetail