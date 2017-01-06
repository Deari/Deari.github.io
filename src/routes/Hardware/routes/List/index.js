import React from 'react'
import { Link } from 'react-router'
import List from '../../../../components/List'
import fetchUtil from '../../../utils/fetchUtil'
import Slidebar from '../../../../components/Sidebar'
import './index.scss'
import '../../../../styles/_base.scss'
import { getDomain } from '../../../utils/domain';

class HardwaresList extends React.Component {
  state = {
    listData: [],
    status : -2  //-1 0 1 2 
  }
  
  async getList(isFirst) {

    let apiUrl = isFirst? 
    getDomain("http://api.intra.","ffan.net/bo/v1/web/hardware/myHardware") :
    getDomain("http://api.intra.","ffan.net/bo/v1/web/hardware/myHardware/"+this.state.status)

    try {
      const res = await fetchUtil.getJSON(apiUrl);
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
    if (value === this.state.status) return;
    this.setState({ status : value }, async () => {
      let resp = value >= 0 ? await this.getList() : await this.getList(true);
      this.setState({ listData: resp })
      if (!resp.length) {
        console.log("noData")
      }
    });
  }

  render() {
    const urls = {
      create: { url: `/hardware/create`, name: '创建新硬件' },
      list: { url: `/hardware/list`, name: '我的硬件', active: true },
      doc: { url: `/hardware/doc` }
    }

    return (
      <div className="container clx">
        <Slidebar urls={urls} type="hardware"/>
        <div className="sub-container plf bg-white">
          <ul className="sub-content-tab">
            <li><a className={this.state.status === -1 ? 'tab-active' : ''} onClick={this.changeList.bind(this,-1)}>全部</a></li>
            <li><a className={this.state.status === 2 ? 'tab-active' : ''} onClick={this.changeList.bind(this,2)}>已审核</a></li>
            <li><a className={this.state.status === 1 ? 'tab-active' : ''} onClick={this.changeList.bind(this,1)}>待审核</a></li>
            <li><a className={this.state.status === 0 ? 'tab-active' : ''} onClick={this.changeList.bind(this,0)}>待提交</a></li>
          </ul>
          <ul className="list-title">
            <li className="w124">LOGO</li>
            <li className="w342">硬件名称</li>
            <li className="w90">价格</li>
            <li className="w90">状态</li>
            <li className="w90">已下载</li>
            <li className="w112">操作</li>
          </ul>
          <List data={this.state.listData} showName="hardware"/>
        </div>
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'list',
  component: HardwaresList
})