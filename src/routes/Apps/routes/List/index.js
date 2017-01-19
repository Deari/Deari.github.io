import React from 'react'
import { Link } from 'react-router'
import List from 'components/List'
import fetchUtil from 'routes/utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'routes/utils/debug'
import Slidebar from 'components/Sidebar'
import ListNav from 'components/ListNav'
import './index.scss'
import 'styles/_base.scss'

class AppsList extends React.Component {
  state = {
    listData: [],
    navData: [
      {name: "全部", value: 0, active: true},
      {name: "已审核", value: 2},
      {name: "待审核", value: 1},
      {name: "待提交", value: 3}
    ]
  }
  
  async getList() {
    const apiUrl = getDomain("web/developer/apps")
    const reviewStatus = this.getReviewStatus()
    try {
      let res = await fetchUtil.getJSON(apiUrl, { reviewStatus: reviewStatus });
      if(res.status == 200){
        return res.data && res.data.list
      } else {
        debug.warn("获取列表接口错误")
        return false
      }
    } catch (e) {
      debug.warn("网络错误")
    }
  }

  getReviewStatus() {
    const { navData } = this.state
    let reviewStatus = 0
    navData.map((item, index) => {
      if (item && item.active) reviewStatus = item.value 
    })
    return reviewStatus
  }

  getStatus(item) {
    let state = this.formatState(item)

    switch(state) {
      case 1:
        return { status: "待审核", showEdit: false, showNew: false }
        break
      case 2:
        return { status: "已审核", showEdit: false, showNew: true }
        break
      case 3:
        return { status: "待提交", showEdit: true, showNew: false }
        break
      default:
        return ''
    }
  }

  formatState(item) {
    const status = item.reviewStatus && parseInt(item.reviewStatus)
    const codeId = item.codeId && item.codeId || ''
    let state = 3
    if (codeId && status) state = status
    return state
  }

  formatListData(listData) {
    let newData = []
    listData.map((item, index) => {
      if (item) {
        let obj = {}

        obj.id = item.appId && item.appId || ''
        obj.logo = item.appLogo && item.appLogo || ''
        obj.name = item.appName && item.appName || ''
        obj.desc = item.appDesc && item.appDesc || ''
        obj.price = '免费'
        obj.status = this.getStatus(item).status
        obj.download = 100
        obj.detailUrl = `/apps/detail/${obj.id}`

        const editUrl = `/apps/edit/${obj.id}`

        const showBtn = this.getStatus(item)

        obj.btnData = [
          {name: "编辑", url: editUrl, active: showBtn.showEdit},
          {name: "发布新版本", url: editUrl, active: showBtn.showNew}
        ]

        newData.push(obj)
      }
    })
    
    return newData
  }

  async componentDidMount() {
    const listData = await this.getList()
    const newData = listData && this.formatListData(listData)
    newData && this.setState({listData: newData})
  }

  changeNav(obj) {
    this.setState({...obj}, async () => {
      const listData = await this.getList()
      const newData = listData && this.formatListData(listData)
      newData && this.setState({listData: newData})
    })
  }

  render() {

    const { navData, listData } = this.state

    const urls = {
      create: { url: `/apps/create`, name: '发布新应用' },
      list: { url: `/apps/list`, name: '我的应用', active: true },
      doc: { url: `/apps/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} />
        <div className="sub-container plf bg-white">
          <ListNav navData={navData} onChange={this.changeNav.bind(this)} />
          <ul className="list-title">
            <li className="w124">Logo</li>
            <li className="w342">应用名称</li>
            <li className="w90">价格</li>
            <li className="w90">状态</li>
            <li className="w90">已下载</li>
            <li className="w112">操作</li>
          </ul>
          <List listData={listData} />
        </div>
      </div>
    )
  }
}
module.exports = (store) => ({
  path: 'list',
  component: AppsList
})