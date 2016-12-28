import React from 'react'
import { Link } from 'react-router'
import List from '../../../../components/List'
import fetchUtil from '../../../utils/fetchUtil'
import Slidebar from '../../../../components/Sidebar'
import './index.scss'
import '../../../../styles/_base.scss'
import { getDomain } from '../../../utils/domain';

class AppsList extends React.Component {
  state = {
    listData: [],
    reviewStatus: -2  //-1 0 1 2
  }
  
  async getList(isFirst) {
    const apiUrl = getDomain(
      "http://api.intra.",
      "ffan.net/bo/v1/web/developer/apps"
    )
    try {
      let res = isFirst ? await fetchUtil.getJSON(apiUrl) : await fetchUtil.getJSON(apiUrl, { reviewStatus: this.state.reviewStatus });
      if(res.status === 200){
        return res.data && res.data.list
      } else {
        console.log("res ", res);
        return []
      }
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount() {
    this.changeList(-1)
  }


  changeList(value) {
    if (value === this.state.reviewStatus) return;
    this.setState({ reviewStatus: value }, async () => {
      let resp = value >= 0 ? await this.getList() : await this.getList(true);
      this.setState({ listData: resp })
      if (!resp.length) {
        console.log("noData")
      }
    });
  }

  render() {
    const urls = {
      create: { url: `/apps/create` },
      list: { url: `/apps/list`, active: true },
      doc: { url: `/apps/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} />
        <div className="sub-container plf bg-white">
          <ul className="sub-content-tab">
            <li><a className={this.state.reviewStatus === -1 ? 'tab-active' : ''} onClick={this.changeList.bind(this,-1)}>全部</a></li>
            <li><a className={this.state.reviewStatus === 0 ? 'tab-active' : ''} onClick={this.changeList.bind(this,0)}>已审核</a></li>
            <li><a className={this.state.reviewStatus === 1 ? 'tab-active' : ''} onClick={this.changeList.bind(this,1)}>未审核</a></li>
            <li><a className={this.state.reviewStatus === 2 ? 'tab-active' : ''} onClick={this.changeList.bind(this,2)}>未提交</a></li>
          </ul>
          <ul className="list-title">
            <li className="w124">LOGO</li>
            <li className="w342">应用名称</li>
            <li className="w90">价格</li>
            <li className="w90">状态</li>
            <li className="w90">已下载</li>
            <li className="w114">操作</li>
          </ul>
          <List data={this.state.listData} showName="应用"/>
        </div>
      </div>
    )
  }
}
module.exports = (store) => ({
  path: 'list',
  component: AppsList
})