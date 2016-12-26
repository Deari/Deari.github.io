import React from 'react'
import { Link } from 'react-router'
import List from '../../../../../components/List'
import fetchUtil from '../../../../utils/fetchUtil'
import Slidebar from '../../../../../components/Sidebar'
import './index.scss'
import '../../../../../styles/_base.scss'
import { getDomain } from '../../../../utils/domain';

class AppsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      reviewStatus: 1
    }
  }
  async getList() {

    const apiUrl = getDomain(
      "http://api.intra.",
      "ffan.net/bo/v1/web/developer/apps"
    )
    try {
      const res = await fetchUtil.getJSON(apiUrl, {reviewStatus: this.state.reviewStatus});
      if(res.status === 200){
        return res.data && res.data.list && res.data.list
      } else {
        console.log("res ", res);
      }
    } catch (e) {
      console.log(e)
    }
  }
  componentDidMount() {
    this.getList().then(
      response => {
        response && this.setState({listData: response})
      }
    )
  }
  changeList(value) {
    if (value === this.state.reviewStatus) return;
    this.setState({reviewStatus: value}, () => {
      this.getList().then(
        response => {
          response && this.setState({listData: response})
        }
      )
    });
  }
  render() {
    return (
      <div className="container clx">
        <Slidebar />
        {/*<div className="col-sm-2 col-md-2 navThird">
          <ul>
            <li className={this.state.reviewStatus === 1 ? 'navThirdHover' : ''}
                onClick={this.changeList.bind(this, 1)}>待审核-应用</li>
            <li className={this.state.reviewStatus === 2 ? 'navThirdHover' : ''}
                onClick={this.changeList.bind(this, 2)}>已审核</li>
          </ul>
        </div>*/}
        <div className="sub-container plf bg-white">
          {/*<Link className="create-app" to='/developer/apps/create?'>
            <button className="btn btn-primary float-right">+ 创建应用zzg</button>
          </Link>*/}
          <ul className="sub-content-tab">
            <li><a className="tab-active">全部</a></li>
            <li><a>已审核</a></li>
            <li><a>未审核</a></li>
          </ul>
          <ul className="list-title">
            <li className="w124">LOGO</li>
            <li className="w342">应用名称</li>
            <li className="w90">价格</li>
            <li className="w90">状态</li>
            <li className="w90">已下载</li>
            <li className="w114">操作</li>
          </ul>
          <List data={this.state.listData} showName="应用" linkUrl="/developer/apps/create" />
        </div>
      </div>
    )
  }
}

export default AppsList;