/**
 * Created by lizhuo on 2017/6/13.
 */

import React from 'react'
import SideBar from 'business/SideBar'
import { Link } from 'react-router'
import { HardwareLinks } from '../../../../config/index'
import s from './index-new.scss'
import Search from '../../../../components/Search/index'
import Switch from './Switch/index'
import Table from './Table/index'
import Modal from 'components/Modal/index'
import ItemDetail from './ItemDetail/index'


class HardwareGoods extends React.Component {
  constructor (){
    super()
    this.state = {
      item:{},
      active:false
    }
  }

  render () {
    const pageLinks = [{
      link: <Link to={`${HardwareLinks.list}`}><i className={`iconfont icon-application`} />我的硬件</Link>
    },{
      link: <Link to={`${HardwareLinks.doc}`}><i className={`iconfont icon-file`} />开发者文档</Link>
    },{
      to:HardwareLinks.goods,label:'商品管理',icon:'sidebar0'
    },{
      to:HardwareLinks.order,label:'订单管理',icon:'sidebar0'
    }],
      detail = {
        active:false,
        type:null
      },
      data = [
        {
          'name':'智能打印机',
          'pic':'',
          'company':'飞凡科技公司',
          'introduce':'飞凡云POS是未门店提供收银计算、门店管理等多功能于一身的专业工具',
          'class':'智慧商场/豆浆机',
          'number':'EDOOOU 004',
          'price':'100',
          'stock':'20',
          'status':0
        },
        {
          'name':'智能打印机',
          'pic':'',
          'company':'飞凡科技公司',
          'introduce':'飞凡云POS是未门店提供收银计算、门店管理等多功能于一身的专业工具',
          'class':'智慧商场/打印机',
          'number':'EDOOOU 003',
          'price':'200',
          'stock':'20',
          'status':1
        },
        {
          'name':'智能打印机',
          'pic':'',
          'company':'飞凡科技公司',
          'introduce':'飞凡云POS是未门店提供收银计算、门店管理等多功能于一身的专业工具',
          'class':'智慧商场/打印机',
          'number':'EDOOOU 002',
          'price':'300',
          'stock':'20',
          'status':2
        },
        {
          'name':'智能打印机',
          'pic':'',
          'company':'飞凡科技公司',
          'introduce':'飞凡云POS是未门店提供收银计算、门店管理等多功能于一身的专业工具',
          'class':'智慧商场/打印机',
          'number':'EDOOOU 001',
          'price':'400',
          'stock':'20',
          'status':3
        }
      ],
      statusList = [{
        'class':'already',
        'text':'已上架'
      },{
        'class':'cancel',
        'text':'已下架'
      },{
        'class':'wait',
        'text':'待上架'
      },{
        'class':'none',
        'text':'缺货'
      }],
      showAlert = (index) => {
        this.setState({
          item:index,
          active:true
        })
      },
      onSearch = (e) => {
        console.log(e)
      },
      onCloseModal = () => {
        this.setState({
          item:{},
          active:false
        })
      }
    return (
      <div className="container">
        <SideBar type="hardware" pageLinks={pageLinks}/>
        <div className={`${s['detail-container']}`}>
          <div className={`${s['search']}`}>
            <Search style={{'float':'right','margin':'0'}} placeholder={'商品名称'} onSearch={onSearch}/>
          </div>
          <div className={`${s['table']}`}>
            <Switch />
            <Table data={data} statusList={statusList} onclick={showAlert} />
          </div>
        </div>
        <Modal active={this.state.active}>
          <ItemDetail onCloseModal={onCloseModal} data={this.state.item}/>
        </Modal>
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'goodsmanage',
  component: HardwareGoods
})
