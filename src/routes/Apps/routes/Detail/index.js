import React from 'react'
import { Link } from 'react-router'
import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'utils/debug'
import moment from 'moment'
import Slidebar from 'components/Sidebar'
import { getCodeStatus } from 'components/Detail/header'
import { Versions, SaleRange, Unapprove, AdminUnshelved } from 'components/Detail/footer'
import Detail from 'components/Detail'

class AppsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      tags: [],
      versions: [],
      activeCodeVersion: '',
      activeCodeStatus: 5,
      showAll: false
    };
  }

  async getInfo() {
    let id = this.props.params.id;
    let apiUrl = getDomain(`web/developer/app/${id}`);
    try {
      let res = await fetchUtil.getJSON(apiUrl);
      if (res && res.status === 200) {
        res.data && this.formatData(res.data);
      } else {
        debug.warn("获取详情接口返回错误")
      }
    } catch (e) {
     debug.warn("获取详情接口返回错误")
    }
  }

  async getTags() {
    let apiUrl = getDomain(`public/common/tags?type=app`);
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res.status === 200) {
        res.data && this.setState({ tags: res.data })
      } else {
        debug.warn("获取标签接口返回错误")
      }
    } catch (e) {
      debug.warn("获取标签接口返回错误")
    }
  }

  async componentDidMount() {
    await this.getInfo()
    await this.getTags()
    let { tags } = this.state
    tags.unshift({ tagId: 0, tagName: "全部标签" })
    tags.map((item, index)=> {
      item.aHref = (index == 0) ? `/apps` : `/apps?tagId=${item.tagId}`
    })
    this.setState({ tags: tags })
  }

  formatData(data) {
    data.updateTime = data.updateTime && moment(data.updateTime * 1000).format("YYYY-MM-DD H:m:s")
    data.createTime = data.createTime && moment(data.createTime * 1000).format("YYYY-MM-DD H:m:s")

    data.versions.map((v, index) => {
      v.codeUpdateTime = v.codeUpdateTime && moment(v.codeUpdateTime * 1000).format('YYYY-MM-DD H:m:s')
      const size = (v.bundleSize && (v.bundleSize/1024/1024).toFixed(2)) || 0
      v.bundleSize = (size && size != 0.00 && `${size} MB`) || `0 MB`
    })
    const activeCodeVersion = (data.versions && data.versions[0] && data.versions[0].codeVersion) || ''
    // const activeCodeStatus = this.getCurrentVersionStatus(data)
    const versions = (data.versions && data.versions.slice(1, 2)) || []
    //this.setState({data: data, activeCodeVersion: activeCodeVersion, activeCodeStatus: activeCodeStatus, versions: versions});
    this.setState({data: data, activeCodeVersion: activeCodeVersion, versions: versions});
  }

  getCurrentVersionStatus(data) {
    if (!data || !data.mine) return 0
    if (data.versions && data.versions[0]) {
      const codeStatus = getCodeStatus(data, data.versions[0]).codeStatus
      console.log("codeStatus ", codeStatus)
      return codeStatus
    }
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

  changeRange(reviewStatus) {
    console.log("reviewStatus ", reviewStatus)
  }

  changeVersionBtn(code) {
    console.log("code ", code)
    code && this.setState({
      activeCodeVersion: code.codeVersion,
      activeCodeStatus: code.codeStatus
    })
  }

  clickPublish() {
    const { data } = this.state
    const appId = data && data.appId
    console.log("clickPublish ", appId)
    const formData = new FormData()
    formData.append(onLine, 1)

    let apiUrl = getDomain(`/web/developer/app/${appId}/publish`);
    fetchUtil.postJSON(apiUrl, formData, {jsonStringify: false}).then(res => {
      if (res.status === 200) {
        debug.warn("发布成功")
      } else {
        debug.warn("发布失败")
      }
    }).catch(e=>{
      debug.warn('网络错误')
    })
  }

  render() {
    
    const { data, tags, versions, showAll, activeCodeVersion, activeCodeStatus } = this.state
    const infoTags = data.tags || []
    const latestVersion = (data.versions && data.versions[0]) || {}
    const showSize = true

    const id = this.props.params.id
    const editUrl = `/apps/edit/${id}`
    const createUrl = `/apps/create`

    const urls = {
      create: { url: `/apps/create`, name: '发布新应用' },
      list: { url: `/apps/list`, name: '我的应用' },
      doc: { url: `/apps/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} tags={tags} />

        <Detail data={data} latestVersion={latestVersion} infoTags={infoTags} versions={versions} 
                showAll={showAll} showSize={showSize} editUrl={editUrl} createUrl={createUrl} 
                onChangeShowAll={this.changeShowAll.bind(this)} onChangeRange={this.changeRange.bind(this)} 
                activeCodeVersion={activeCodeVersion} onChangeVersion={this.changeVersionBtn.bind(this)} 
                activeCodeStatus={activeCodeStatus} onClickPublish={this.clickPublish.bind(this)} />
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'detail/:id',
  component: AppsDetail
})