/**
 * Created by lizhuo on 2017/6/13.
 */

import React from 'react'
import SideBar from 'business/SideBar'
import { Link } from 'react-router'
import { HardwareLinks } from '../../../../config/index'
import s from './index-new.scss'
import Search from '../../../../components/Search/index'
import Table from './Table/index'
import Modal from 'components/Modal/index'
import ItemDetail from './ItemDetail/index'
import { getDomain } from '../../../../utils/d'
import fetchUtil from '../../../../utils/fetchUtil'

class HardwareGoods extends React.Component {
  constructor () {
    super()
    this.state = {
      item: {},
      active: false,
      data: [{
        "remark": null,
        "productKey": "0f3769eb63284bdd8784792dd92783a1",
        "type": "其它",
        "image": null,
        "brand": null,
        "connectType": "WIFI",
        "price": null,
        "productDesc": null,
        "updatedAt": 1490558951,
        "model": null,
        "verboseName": "数据测试",
        "id": 5,
        "createdAt": 1490558951
      }
      ],
      total:0
    }
    this.getMyGoods();
  }

  getMyGoods(){
    fetchUtil.getJSON(
      getDomain('/app/v1/bo/v1/web/hardware/myHardware'), {
        'developerId': 0,
        'limit': 10
      }).then(data => {
      this.setState({
        // data:data.data.list,
        total:data.data.meta.total
      })
    })
  }

  render () {

    const {data,total,active,item} = this.state

    const pageLinks = [{
        link: <a href={`${HardwareLinks.list}`}><i className={`iconfont icon-application`}/>我的硬件</a>
      }, {
        link: <a href={`${HardwareLinks.doc}`}><i className={`iconfont icon-file`}/>开发者文档</a>
      }, {
        to: HardwareLinks.goods, label: '商品管理', icon: 'sidebar0'
      }, {
        to: HardwareLinks.order, label: '订单管理', icon: 'sidebar0'
      }],
      statusList = [{
        'class': 'already',
        'text': '已上架'
      }, {
        'class': 'cancel',
        'text': '已下架'
      }, {
        'class': 'wait',
        'text': '待上架'
      }, {
        'class': 'none',
        'text': '缺货'
      }],
      showAlert = (index) => {
        this.setState({
          item: index,
          active: true
        })
      },
      onSearch = (e) => {
        console.log(e)
      },
      onCloseModal = () => {
        this.setState({
          item: {},
          active: false
        })
      },
      itemList = [
        {txt: '全部', value: 0}, {txt: '已上架', value: 1}, {txt: '已下架', value: 2}, {txt: '待上架', value: 3}, {txt: '缺货', value: 4}
      ]

    return (
      <div className="container">
        <SideBar type="hardware" pageLinks={pageLinks}/>
        {
          data.length !== 0 ? <div className={`${s['detail-container']}`}>
            <div className={`${s['search']}`}>
              <Search style={{'float': 'right', 'margin': '0'}} placeholder={'商品名称'} onSearch={onSearch}/>
            </div>
            <div className={`${s['table']}`}>
              <Table data={data} statusList={statusList} onclick={showAlert} itemList={itemList} total={data}/>
            </div>
          </div> : <div className={`${s['detail-container']}`} style={{'display': 'table'}}>
            <div className={`${s['noHardware']}`}>
              <p>还没有硬件，快去看看其他朋友的硬件吧</p>
              <button>
                <Link to="/hardware">查看硬件市场</Link>
              </button>
            </div>
          </div>}
        <Modal active={active}>
          <ItemDetail onCloseModal={onCloseModal} data={item}/>
        </Modal>
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'goodsmanage',
  component: HardwareGoods
})
