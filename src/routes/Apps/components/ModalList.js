import React, { Component, PropTypes } from 'react'
import { getDomain } from 'utils/domain'
import fetchUtil from 'utils/fetchUtil'
import { Link } from 'react-router'
class ModalList extends Component {
   state= {
     datalist: [],
   }

   initial=[]

   handleClick(item){
     this.props.handleIdchange(item.appId)
     this.props.handleLogochange(item.appLogo)
     this.props.handleNamechange(item.appName)
   }
   handleCancel(item){
     this.props.handleIdchange(item.appId)
     this.props.handleLogochange(item.appLogo)
     this.props.handleNamechange(item.appName)
   }
   handleChange(e){
     const newList = this.initial.filter((v)=> v.appName.indexOf(e.target.value)!= -1 )||[]
     this.setState({datalist:newList})
   }
   getStatus(item,v) {
    let state = this.formatState(item,v)
    switch(state) {
      case 1:
        return { status: "审核中", activeColor: "yellow", }
        break
      case 2:
        return { status: "已发布", activeColor: "green", }
        break
      case 3:
        return { status: "被管理员下架", activeColor: "red", }
        break
      case 4:
        return { status: "被开发者下架", activeColor: "red", }
        break
      case 5:
        return { status: "等待开发者发布", activeColor: "yellow", }
        break
      case 6:
        return { status: "审核未通过", activeColor: "red", }
        break
      case 7:
        return { status: "准备提交", activeColor: "yellow", }
        break
      default:
        return ''
    }
  }
  formatState(item,v) {
    let state = 0
    if(v.reviewStatus==1){
       return 1
    }else if(v.reviewStatus==2){
      if(item.adminUnshelved){
        return 3 
      }else if(item.devUnshelved){
        return 4
      }else if(v.publishStatus){
        return 2 
      }else{
        return 5
      }
    }else if(v.reviewStatus==3){
      return 6 
    }else {
      return 7
    }
  }
  filterList(datalist){
    const newList =[]; 
    datalist.map((item,index)=>{
      if(item.appId!=this.props.appId&&!item.adminUnshelved && !item.devUnshelved){
        for(let i =0;i<item.versions.slice(0,2).length;i++){
          if(item.versions[i].publishStatus && item.versions[i].reviewStatus!=3){
              newList.push(item)
              break;
          }
        }
      }
    })
    return(newList)
  }

   async componentDidMount() {
     if(this.props.type === 'app'){
       const apiUrl = getDomain("web/developer/apps")
       try {
          const res = await fetchUtil.getJSON(apiUrl,{limit:5000});
          if (res.status == 200) {
            this.setState({datalist:res.data && res.data.list})
            Object.assign(this.initial, res.data && res.data.list)
          } else {
            debug.warn("获取列表接口错误")
            return false
          }
       } catch (e) {
          console.log("网络错误", e)
       }
     }else if(this.props.type === 'widget'){
      const apiUrl = getDomain("web/developer/widgets")
       try {
          const res = await fetchUtil.getJSON(apiUrl,{limit:5000});
          if (res.status == 200) {
            this.setState({datalist:res.data && res.data.list})
            Object.assign(this.initial, res.data && res.data.list)
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
    const { idList, type} = this.props
    const { datalist } = this.state 
    const newList = this.filterList(datalist)
    const typeTxt = type === 'app' ? '应用' : type === 'widget' ? '组件' : '硬件'
    const typeUrl = type === 'app' ? `/apps` : type === 'widget' ? `/widgets` : `/hardware`
    return (
       <div className="popup-box">      
          <div className="popup-search">
            <input type="text" placeholder={"请输入"+typeTxt+"名称进行搜索"} onChange={e=>{this.handleChange(e,this)}}/>
          </div>
          <ul className="popup-list-title">
            <li className="w116">Logo</li>
            <li className="w320">{typeTxt}名称</li>
            <li className="w78">价格</li>
            <li className="w140">状态</li>
            <li className="w104">操作</li>
          </ul>
          <div className="popup-list-box">
            <div className="listContent">
            {
              newList.length == 0 ? <div className="list-none">请输入正确名称</div> :
                newList.map((item, index) =>  (
                      <div className="popup-list-container" key={index}>
                        <div className="popup-info-img-container w116">
                          <p className="popup-info-img" > <img src={item.appLogo} /></p>
                        </div>
                        <div className="popup-info-content w320">
                          <p className="popup-info-name"> {item.appName}<i className={item.appKind === 0 ?"icon-rnpng":item.appKind ===1 ?"icon-hpng":"icon-apkpng"}></i></p>
                          <p className="popup-info-introduce"> {item.appDesc}</p>
                          <Link className="popup-info-link" to={typeUrl}>在{typeTxt}市场中查看<i className="iconfont icon-categoryindi"></i></Link>
                        </div>
                        <div className="popup-info-price w78">免费</div>
                        <div className="popup-info-status w140">
                        {
                          item.versions[0].publishStatus?
                            item.versions.slice(0,1).map((v,k)=>{
                              return(
                              <div key={k}>
                                <span className="info-status-info1"><i className={this.getStatus(item,v).activeColor == 'red' ? "color-red" : this.getStatus(item,v).activeColor == 'green' ? "color-green" : ""}></i>{v.codeVersion}</span>
                                <span className="info-status-info2">{this.getStatus(item,v).status}</span>
                              </div>
                              )
                            })
                          :
                          item.versions.slice(0,2).map((v,k)=>{
                            return(
                            <div key={k}>
                              <span className="info-status-info1"><i className={this.getStatus(item,v).activeColor == 'red' ? "color-red" : this.getStatus(item,v).activeColor == 'green' ? "color-green" : ""}></i>{v.codeVersion}</span>
                              <span className="info-status-info2">{this.getStatus(item,v).status}</span>
                            </div>
                          )
                          })
                        }
                        </div>
                        <div className="popup-info-btn w104">
                          {idList.indexOf(item.appId) !== -1 ? <button className='btn-cancel' onClick={this.handleCancel.bind(this, item)}>取消选择</button> : <button onClick={this.handleClick.bind(this, item)}>选择</button>}
                        </div>
                      </div>
                    )
                )
              }
          </div>
        </div>      
        <div className="null-box"></div>         
    </div>
    )
  } 
}
export default ModalList
