import React from 'react'
import { Link } from 'react-router'
import List from '../../../../../components/List'
import fetchUtil from '../../../../utils/fetchUtil'
import './index.scss'

class AppsList extends React.Component {
 
  state = {
      listData:[]
  }
  
  async componentDidMount() {
    const apiUrl = `http://10.1.115.14:8006/bo/v1/web/developer/1/widget`
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
      <div className="container">
        <Link to='/developer/widgets/create'><button className="btn btn-primary">+ 创建商家应用</button></Link>
        <div className="list-title">
          <div className="col-sm-8 no-padding-left">名称</div>
          <div className="col-sm-2 no-padding-left">状态</div>
          <div className="col-sm-2 no-padding-left">操作</div>
        </div>
        <List data={this.state.listData} showName="组件" linkUrl="/developer/widgets/create"/>
      </div>
    )
  }
}

export default AppsList;