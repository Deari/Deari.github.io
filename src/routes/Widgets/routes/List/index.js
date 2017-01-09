import React from 'react'
import { Link } from 'react-router'
import List from '../../../../components/List'
import fetchUtil from '../../../utils/fetchUtil'
import Slidebar from '../../../../components/Sidebar'
import './index.scss'
import '../../../../styles/_base.scss'
import { getDomain } from '../../../utils/domain';

class widgetsList extends React.Component {
  state = {
    listData: [],
    reviewStatus: -2  //0 1 2 3
  }
  
  async getList(isFirst) {
    const apiUrl = getDomain(
      "http://api.intra.",
      "ffan.net/bo/v1/web/developer/widgets"
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
      create: { url: `/widgets/create`, name: '创建新组件' },
      list: { url: `/widgets/list`, name: '我的组件', active: true },
      doc: { url: `/widgets/doc` }
    }
    return (
      <div className="container clx">
        <Slidebar urls={urls}  type="widget"/>
        <div className="sub-container plf bg-white">
          <ul className="sub-content-tab">
            <li><a className={this.state.reviewStatus === -1 ? 'tab-active' : ''} onClick={this.changeList.bind(this,-1)}>全部</a></li>
            <li><a className={this.state.reviewStatus === 2 ? 'tab-active' : ''} onClick={this.changeList.bind(this,2)}>已审核</a></li>
            <li><a className={this.state.reviewStatus === 1 ? 'tab-active' : ''} onClick={this.changeList.bind(this,1)}>待审核</a></li>
            <li><a className={this.state.reviewStatus === 3 ? 'tab-active' : ''} onClick={this.changeList.bind(this,3)}>待提交</a></li>
          </ul>
          <ul className="list-title">
            <li className="w124">Logo</li>
            <li className="w342">组件名称</li>
            <li className="w90">价格</li>
            <li className="w90">状态</li>
            <li className="w90">已下载</li>
            <li className="w112">操作</li>
          </ul>
          <List data={this.state.listData} showName="widget" />
        </div>
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'list',
  component: widgetsList
})