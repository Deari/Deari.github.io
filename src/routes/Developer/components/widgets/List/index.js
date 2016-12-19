import React from 'react'
import { Link } from 'react-router'
import List from '../../../../../components/List'
import fetchUtil from '../../../../utils/fetchUtil'
import './index.scss'
import '../../../../../styles/_base.scss'
class AppsList extends React.Component {
 
  state = {
      listData:[]
  }
  
  async componentDidMount() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/developer/1/widget`
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      console.log(res.data.list[0])
      if(res.status === 200){
        alert('成功')
        this.setState({listData:res.data.list})
      }
    } catch (e) {
      alert('失败')
      console.log(e)
    }
   
  }
 
  render() {
    return (
      <div className="cContent container clx">
        <div className="col-sm-2 col-md-2 navThird">
          <ul>
            <li className="navThirdHover">待审核</li>
            <li>已审核</li>
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
 