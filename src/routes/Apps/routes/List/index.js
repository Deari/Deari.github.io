import React from 'react'
import { Link } from 'react-router'
import List from 'components/newList'
import fetchUtil from 'routes/utils/fetchUtil'
import { getDomain } from 'utils/domain';
import { debug } from 'routes/utils/debug';
import Slidebar from 'components/Sidebar'
import Nav from 'components/Nav'
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

  getStatus(reviewStatus) {
    const status = parseInt(reviewStatus)
    switch(status) {
      case 1:
        return "待审核"
        break
      case 2:
        return "已审核"
        break
      case 3:
        return "待提交"
        break
      default:
        return ''
    }
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
        obj.status = item.reviewStatus && this.getStatus(item.reviewStatus) || ''
        obj.download = 100

        newData.push(obj)
      }
    })
    console.log("newData ", newData)
    return newData
  }

  async componentDidMount() {
    const listData = await this.getList()
    const newData = listData && this.formatListData(listData)
    newData && this.setState({listData: newData})
  }

  async changeNav(obj) {
    const listData = await this.getList()
    const newData = listData && this.formatListData(listData)
    newData && this.setState({...obj, listData: newData})
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
          <Nav navData={navData} onChange={this.changeNav.bind(this)} />
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