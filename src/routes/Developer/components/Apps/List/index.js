import React from 'react'
import { Link } from 'react-router'
import List from '../../../../../components/List'
import fetchUtil from '../../../../utils/fetchUtil'
import './index.scss'
import '../../../../../styles/_base.scss'

class AppsList extends React.Component {
  constructor() {
    super();
    this.state = {
      listData: [],
      reviewStatus: 1
    }
  }
  async getList() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/developer/1/apps`;
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
      <div className="cContent clx">
        <div className="col-sm-2 col-md-2 navThird">
          <ul>
            <li className={this.state.reviewStatus === 1 ? 'navThirdHover' : ''}
                onClick={this.changeList.bind(this, 1)}>待审核</li>
            <li className={this.state.reviewStatus === 2 ? 'navThirdHover' : ''}
                onClick={this.changeList.bind(this, 2)}>已审核</li>
          </ul>
        </div>
        <div className="col-sm-10 col-md-10">
          <div className="ccContent">
            <Link className="ccContentBtn" to='/developer/apps/create'>
              <div className="width110 float-right">
                <button className="btn btn-primary">+ 创建应用</button>
              </div>
            </Link>
            <div className="list-title">
              <div className="col-md-3">图例</div>
              <div className="col-md-5">应用介绍</div>
              <div className="col-md-2">状态</div>
              <div className="col-md-2">操作</div>
            </div>
            <List data={this.state.listData} showName="应用" linkUrl="/developer/apps/create" />
          </div>
        </div>
      </div>
    )
  }
}

export default AppsList;