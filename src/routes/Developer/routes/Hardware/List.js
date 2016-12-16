import React from 'react'
import { IndexLink, Link } from 'react-router'
import Item from './item'
import './css/list.scss';
//import fetchUtil from '../../../../utils/fetchUtil'

class MyHardware extends React.Component {
  // state = {
  //     listData:[]
  // }
    
  // async componentDidMount() {
  //   const apiUrl = `http://10.1.115.14:8006/bo/v1/web/developer/1/widget`
  //   try {
  //     const res = await fetchUtil.getJSON(apiUrl);
  //     console.log(res.data.list[0])
  //     if(res.status === 200){
  //       alert('成功')
  //       this.setState({listData:res.data.list})
  //     }
  //   } catch (e) {
  //     alert('失败')
  //     console.log(e)
  //   }
   
  // }
  render() {
    console.log(Item)
    const list = [{
      name: "holle我是一个硬件",
      listImage: 123123,
      Pid: 4556645,
      createTime: "2016/9/11 10:11:10",
      updateTime: "2016/10/11 18:25:26",
      type:0

    }, {
      name: "holle我是一个硬件",
      listImage: 123123,
      Pid: 4556645,
      createTime: "2016/9/11 10:11:10",
      updateTime: "2016/10/11 18:25:26",
      type:1

    }, {
      name: "holle我是一个硬件",
      listImage: 123123,
      Pid: 4556645,
      createTime: "2016/9/11 10:11:10",
      updateTime: "2016/10/11 18:25:26",
      type:0
    }];
    return <div>
      <p>hello 开发硬件的我的硬件</p>
      <ul ClassName='aside'>
        <li><a>已发布产品</a></li>
        <li>未发布产品</li>
      </ul>
      <ul className='displayList'>
        {list.map((item, index) => (
          <li key={index}>
            <Item item={item}/>
          </li>
        ))}
      </ul>
      <Link to='/developer/hardware/create' activeClassName='route--active'>
        创建硬件
      </Link>
    </div>
  }
}

module.exports = {
  path: 'list',
  component: MyHardware
}
