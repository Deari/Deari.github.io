import React, { Component, PropTypes } from 'react'
import { getGateWayDomain, getDomain } from 'utils/domain'
import fetchUtil from 'utils/fetchUtil'
class ModalList extends Component {
   state= {
     datalist: [],
   }
   handleClick(item){
     this.props.handleIdchange(item.appId)
     this.props.handlechange(item.appLogo)
   }
   handleCancel(item){
     this.props.handleIdchange(item.appId)
     this.props.handlechange(item.appLogo)
   }
  //  handleChange(e){
  //   alert(e.target.value)
  //  }
  //  handleKeyDown(e){
  //    if (e && e.keyCode == 13) {
  //      alert(e.target.value)
  //    }
  //  }
  //  onBlur={e=>{this.handleChange(e)}} 
  //           onKeyDown={e=>{this.handleKeyDown(e)}}
   async componentDidMount() {
     if(this.props.type === 'app'){
       const apiUrl = getDomain("web/developer/apps")
       try {
          const res = await fetchUtil.getJSON(apiUrl, { reviewStatus: 2 });
          if (res.status == 200) {
            this.setState({datalist:res.data && res.data.list})
          } else {
            debug.warn("获取列表接口错误")
            return false
          }
       } catch (e) {
          console.log("网络错误", e)
       }
     }else if(this.props.type === 'weiget'){
      const apiUrl = getDomain("web/developer/widgets")
       try {
          const res = await fetchUtil.getJSON(apiUrl, { reviewStatus: 2 });
          if (res.status == 200) {
            this.setState({datalist:res.data && res.data.list})
          } else {
            debug.warn("获取列表接口错误")
            return false
          }
       } catch (e) {
          console.log("网络错误", e)
       }
     }else{
      //未来硬件接口
     }
   }
 
  render() {
    const { idList } = this.props
    const { datalist } = this.state
    return (
       <div className="popup-box">      
          <div className="popup-search">
            <input type="text" placeholder="请输入硬件名称进行搜索" />
          </div>
          <ul className="list-title">
            <li className="w116">Logo</li>
            <li className="w320">应用名称</li>
            <li className="w78">价格</li>
            <li className="w140">状态</li>
            <li className="w104">操作</li>
          </ul>
          <div className="list-box">
            <div className="listContent">
              {
                datalist.length == 0 ? <div className="list-none">没有更多数据了~</div> :
                  datalist.map( (item, index) => (
                     <div className="list-container"  key={index}>
                      <div className="info-img-container w116">
                        <p className="info-img" > <img src={item.appLogo} /></p>
                      </div>
                      <div className="info-content w320">
                        <p className="info-name"> {item.appName}<i className={item.isH5App?"icon-rnpng":"icon-hpng"}></i></p>
                        <p className="info-introduce"> {item.appDesc}</p>
                        <p className="info-link"><a>在应用市场中查看</a><i className="iconfont icon-categoryindi"></i></p>
                      </div>
                      <div className="info-price w78">免费</div>
                      <div className="info-status w140">已审核</div>
                      <div className="info-btn w104">
                      {idList.indexOf(item.appId) !==-1? <button className='btn-cancel' onClick={this.handleCancel.bind(this,item)}>取消选择</button>:<button onClick={this.handleClick.bind(this,item)}>选择</button>}                      
                      </div>
                    </div>
                  ) )
              }
          </div>
        </div>      
        <div className="null-box"></div>         
    </div>
    )
  } 
}
export default ModalList
//<button className="popup-save"  onClick={this.handleSave.bind(this)}>保存</button>
  //  handleSave(){
  //    const { input } = this.props
  //    input.onChange(this.state.idList)
  //  }