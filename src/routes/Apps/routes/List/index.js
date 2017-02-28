import React from 'react'
import { Link } from 'react-router'
import List from 'components/List'
import fetchUtil from 'utils/fetchUtil'
import { getDomain, getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import LoginSDK from 'utils/loginSDK'
import debug from 'utils/debug'
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
      console.log("网络错误", e)
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
console.log(item)
    switch(state) {
      case 1:
        return { status: "审核中", showEdit: false, showNew: false, activeColor: "yellow", }
        break
      case 2:
        return { status: "已发布", showEdit: false, showNew: true, activeColor: "green", }
        break
      case 3:
        return { status: "被管理员下架", showEdit: false, showNew: true, activeColor: "red", }
        break
      case 4:
        return { status: "被开发者下架", showEdit: false, showNew: true, activeColor: "red", }
        break
      case 5:
        return { status: "等待开发者发布", showEdit: false, showNew: false, activeColor: "yellow", }
        break
      case 6:
        return { status: "审核未通过", showEdit: true, showNew: false, activeColor: "red", }
        break
      case 7:
        return { status: "准备提交", showEdit: true, showNew: false, activeColor: "yellow", }
        break
      default:
        return ''
    }
  }

  formatState(item) {
   
    let state = 0
    if(item.adminUnshelved){
      return 3 
    }else if(item.devUnshelved){
      return 4
    }else if(item.publishStatus){
      return 2
    }else if(item.reviewStatus==1){
      return 1
    }else if(item.reviewStatus==2){
      return 5
    }else if (item.reviewStatus==3){
      return 6
    }else {
      return 7
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
        obj.statusObj = this.getStatus(item)
        obj.download = 100
        obj.detailUrl = `/apps/detail/${obj.id}`
        obj.isH5App = item.isH5App
        obj.marketUrl = `/apps`
        obj.codeVersion = item.codeVersion && item.codeVersion || ''
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

  componentDidMount() {
    let sourceVal = getSourceVal()
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = location.href

    LoginSDK.getStatus( async (status, data) => {
      if (status) {
        const listData = await this.getList()
        const newData = listData && this.formatListData(listData)
        newData && this.setState({listData: newData})
      } else {
        debug.warn("登录失败")
      }
    }, url, loginUrl, callbackUrl)
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