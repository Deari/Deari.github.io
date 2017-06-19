/**
 * Created by lizhuo on 2017/6/15.
 */
import React from 'react'
import s from './index-new.scss'
import CheckAll from '../CheckAll/index'


class Table extends React.Component {

  constructor (){
    super()
    this.state = {
      checkedList:[],
      checkedAll:false
    }
  }

  render () {

    const { data, statusList } = this.props,
      onChange = (index) => {
        if(index >= 0){
          this.state.checkedList[index] = !this.state.checkedList[index];
          this.setState({
            checkedList:this.state.checkedList
          })
        }else {
          this.state.checkedAll = !this.state.checkedAll;
          this.setState({
            checkedAll:this.state.checkedAll
          })
          data.map((item, index) => {
            this.state.checkedList[index] = this.state.checkedAll;
            this.setState({
              checkedList:this.state.checkedList
            })
          })
        }
      }

    return (
      <table className={`${s.table}`}>
        <tr>
          <th>
            <CheckAll index={-1} onChange={() => onChange(-1)} checkedAll={this.state.checkedAll} data={data}/>
          </th>
          <th>订单号</th>
          <th>下单时间</th>
          <th>出库时间</th>
          <th>商品信息</th>
          <th>收货人</th>
          <th>金额(元)</th>
          <th>支付方式</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        {data.map((item, index) => {
          const info = item.info,
            addressee = item.addressee;
          return (
            <tr>
              <td>
                <div>
                  <div>
                    <CheckAll index={index} checkedList={this.state.checkedList} onChange={() => onChange(index)} data={data}/>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div>{item.orderID}</div>
                </div>
              </td>
              <td>
                <div>
                  <div>{item.orderTime}</div>
                </div>
              </td>
              <td>
                <div>
                  <div>{item.outTime}</div>
                </div>
              </td>
              <td>
                <div>
                  <div>
                    <p>{info.split(' ')[0] + ' ' + info.split(' ')[1]}</p>
                    <p>{info.split(' ')[2]}</p>
                    <p>{info.split(' ')[3]}</p>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div>
                    <p>{addressee.split(' ')[0]}</p>
                    <p>{addressee.split(' ')[1]}</p>
                    <p title={addressee.split(' ')[2]}>{addressee.split(' ')[2]}</p>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div>¥{item.sum}</div>
                </div>
              </td>
              <td>
                <div>
                  <div>{item.pay}</div>
                </div>
              </td>
              <td>
                <div>
                  <div style={statusList[item.status].style}>{statusList[item.status].text}</div>
                </div>
              </td>
              <td>
                <div>
                  <div>
                    <button>订单处理</button>
                    {item.status === 2?<button>出库</button>:null}
                  </div>
                </div>
              </td>
            </tr>
          )
        })}
      </table>
    )
  }

}

export default Table
