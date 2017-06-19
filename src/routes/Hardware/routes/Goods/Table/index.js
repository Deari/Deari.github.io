/**
 * Created by lizhuo on 2017/6/14.
 */
import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'
import Pagination from 'components/Pagination'

class Table extends React.Component {
  /*自定义数据*/
  constructor (props){
    super(props);
    this.state = {
      active:0
    }
  }
  switchType (value) {
    this.setState({
      active:value
    })
  }
  render () {
    const {data,statusList,onclick, itemList} = this.props,
      {active} = this.state

    return (
      <div>
        <div className={`${s.tabs}`}>
          <ul className='tabs-titles'>
            {itemList && itemList.map((item, index) => {
              return (
                <li className={cx(`tabs-item ${s.tabNav}`,[{active:index === active}])} onClick={() => this.switchType(item.value)}>
                  <span className={s['item-text']}>{item.txt}</span>
                </li>
              )
            })}
          </ul>
        </div>
        <table className={`${s['table']}`}>
          <tr>
            <th>商品信息</th>
            <th>分类</th>
            <th>型号</th>
            <th>单价</th>
            <th>库存</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
          {data.map((item) => {
            return (
              <tr>
                <td>
                  <img src="" alt="" className={`${s.pic}`}/>
                  <div className={`${s.info}`}>
                    <h4 className={`${s.name}`}>{item.name}</h4>
                    <p className={`${s.company}`}>
                      {item.company}
                    </p>
                    <p className={`${s.moreinfo}`} style={{'-webkit-box-orient':'vertical'}}>
                      {item.introduce}
                    </p>
                  </div>
                </td>
                <td>
                  <p>
                    <p>{item.class}</p>
                  </p>
                </td>
                <td>
                  <p>
                    <p>
                      <p>{item.number.split(' ')[0]}</p>
                      <p>{item.number.split(' ')[1]}</p>
                    </p>
                  </p>
                </td>
                <td>
                  <p>
                    <p  className={`${s.price}`}>
                      ¥ {item.price}
                    </p>
                  </p>
                </td>
                <td>
                  <p>
                    <p>
                      20
                    </p>
                  </p>
                </td>
                <td>
                  <p>
                    <p className={s[statusList[item.status].class]}>
                      {statusList[item.status].text}
                    </p>
                  </p>
                </td>
                <td>
                  <p>
                    <p>
                      <button className={`${s['manage-btn']}`} onClick={() => onclick(item)}>商品管理</button>
                      {item.status === 0?<button className={`${s['cancel']}`}>下架</button>:null}
                    </p>
                  </p>
                </td>
              </tr>
            )
          })}
        </table>
        <Pagination/>
      </div>
    )
  }
}

export default Table
