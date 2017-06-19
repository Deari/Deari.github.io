/**
 * Created by lizhuo on 2017/6/14.
 */
import React from 'react';
import SideBar from '../../../../business/SideBar/index'
import { HardwareLinks } from '../../../../config/index'
import { Link } from 'react-router'
import Switch from './Switch/index'
import s from './index-new.scss'
import Table from './Table/index'



class OrderManage extends React.Component {

  constructor (){
    super()
    this.state = {
      items:[
        {
          orderID:49207208,
          orderTime:'2017.1.05 14:37',
          outTime:'2017.1.05 14:37',
          info:'飞凡 门店POS 2wewewer00 1500元／台*2',
          addressee:'李先生 13889897878 北京市朝阳区建国路91好万达广场金地中心A座22曾1901-234座位',
          sum:2100,
          pay:'微信',
          status:0
        },
        {
          orderID:49207208,
          orderTime:'2017.1.05 14:37',
          outTime:'2017.1.05 14:37',
          info:'飞凡 门店POS 2wewewer00 1500元／台*2',
          addressee:'李先生 13889897878 北京市朝阳区建国路91好万达广场金地中心A座22曾1901-234座位',
          sum:2100,
          pay:'微信',
          status:1
        },
        {
          orderID:49207208,
          orderTime:'2017.1.05 14:37',
          outTime:'2017.1.05 14:37',
          info:'飞凡 门店POS 2wewewer00 1500元／台*2',
          addressee:'李先生 13889897878 北京市朝阳区建国路91好万达广场金地中心A座22曾1901-234座位',
          sum:2100,
          pay:'微信',
          status:2
        },
        {
          orderID:49207208,
          orderTime:'2017.1.05 14:37',
          outTime:'2017.1.05 14:37',
          info:'飞凡 门店POS 2wewewer00 1500元／台*2',
          addressee:'李先生 13889897878 北京市朝阳区建国路91好万达广场金地中心A座22曾1901-234座位',
          sum:2100,
          pay:'微信',
          status:3
        },
        {
          orderID:49207208,
          orderTime:'2017.1.05 14:37',
          outTime:'2017.1.05 14:37',
          info:'飞凡 门店POS 2wewewer00 1500元／台*2',
          addressee:'李先生 13889897878 北京市朝阳区建国路91好万达广场金地中心A座22曾1901-234座位',
          sum:2100,
          pay:'微信',
          status:4
        },
        {
          orderID:49207208,
          orderTime:'2017.1.05 14:37',
          outTime:'2017.1.05 14:37',
          info:'飞凡 门店POS 2wewewer00 1500元／台*2',
          addressee:'李先生 13889897878 北京市朝阳区建国路91好万达广场金地中心A座22曾1901-234座位',
          sum:2100,
          pay:'微信',
          status:5
        },
        {
          orderID:49207208,
          orderTime:'2017.1.05 14:37',
          outTime:'2017.1.05 14:37',
          info:'飞凡 门店POS 2wewewer00 1500元／台*2',
          addressee:'李先生 13889897878 北京市朝阳区建国路91好万达广场金地中心A座22曾1901-234座位',
          sum:2100,
          pay:'微信',
          status:0
        },
      ]
    }
  }

  render () {

    /*假数据*/

    const pageLinks = [{
      link: <Link to={`${HardwareLinks.list}`}><i className={`iconfont icon-application`} />我的硬件</Link>
    },{
      link: <Link to={`${HardwareLinks.doc}`}><i className={`iconfont icon-file`} />开发者文档</Link>
    },{
      to:HardwareLinks.goods,label:'商品管理',icon:'sidebar0'
    },{
      to:HardwareLinks.order,label:'订单管理',icon:'sidebar0'
    }],
      statusList = [
        {text:'未付款',style:{'color':'rgb(38,146,251)'}},
        {text:'已付款',style:{}},
        {text:'未出库',style:{'color':'rgb(38,146,251)'}},
        {text:'已出库',style:{}},
        {text:'已取消',style:{}},
        {text:'已完成',style:{}},
      ]

    return (
      <div className="container">
        <SideBar type="hardware" pageLinks={pageLinks}/>
        <div className={`${s['detail-container']}`}>
          <div className={`${s['table']}`}>
            <Switch />
            <Table data={this.state.items} statusList={statusList}/>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'ordermanage',
  component: OrderManage
})
