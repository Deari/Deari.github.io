import React from 'react'

class CommentTpl extends React.Component {
  state={
    list: this.props.assessList[0].list,
    active: 'all'
  }
  hanglechange(value,list){
    this.setState({active:value,list:list})
  }
  render() {
   const {assessList,highPraise,tags} = this.props
   const {active,list}=this.state
    return (
      <div className="detail-table-content">
        <h5 className="detail-title-evaluate">商品评价</h5>
        <div className="detail-evaluate">
          <dl>
            <dt>好评度</dt>
            <dd>{highPraise}</dd>
          </dl>
          <ul>
            {
              tags.map((v,k)=>(
                <li key={k}>{v}</li>
              ))
            }
          </ul>
        </div>
        <ul className="detail-evaluate-nav">
          {
            assessList.map((item, index) => (
              <li key={index}>
                <div className="row-radio">
                  <input type="radio" name="radio" value={item.value} onChange={this.hanglechange.bind(this,item.value,item.list)} checked={item.value==active}/>
                  <span>
                    <i className="iconfont icon-radio1"></i>
                    <i className="iconfont icon-radio2"></i>
                  </span>
                </div>
                <label>{item.title}{item.list.length}</label>
              </li>
            ))
          }
        </ul>
        <div className="detail-evaluate-box">
          {
            list.map((v, k) => (
              <div className="detail-evaluate-contaier" key={k}>
                <dl className="detail-evaluate-user">
                  <dt><img src="../../../Home/assets/userIcn.jpg" /></dt>
                  <dd className="detail-evaluate-name">用户名</dd>
                  <dd className="detail-evaluate-star">
                    <i className="iconfont icon-star"></i>
                    <i className="iconfont icon-star"></i>
                    <i className="iconfont icon-star"></i>
                    <i className="iconfont icon-uncollected"></i>
                    <i className="iconfont icon-uncollected"></i>
                  </dd>
                </dl>
                <dl className="detail-evaluate-text">
                  <dt>{v.txt}</dt>
                  <dd>{v.creatTime}</dd>
                </dl>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
} 
export default CommentTpl  