import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'
import fetchUtil from 'utils/fetchUtil'
import { getDomain } from '../../../utils/d'

class SDKDownload extends React.Component{
  constructor (){
    super()
    this.state = {
      AndroidOrIOS:true,
      switchList:[true, false, false],
      address:'',
      showAddress:false
    }
  }
  handleClick (index) {
    if(this.state.AndroidOrIOS && index){
      this.setState({
        AndroidOrIOS:!this.state.AndroidOrIOS
      })
    }else if(!this.state.AndroidOrIOS && !index){
      this.setState({
        AndroidOrIOS:!this.state.AndroidOrIOS
      })
    }
    this.setState({
      switchList:[true, false, false]
    })
  }

  getUrl (state) {
    let appKind = '',
      appList = !state.AndroidOrIOS?state.switchList.slice(0,2):state.switchList;
    appList.map((item, index) => {
      appKind += item?index + ',':''
    })
    this.setState({address:''})
    let apiUrl = getDomain('/app/v1/bo/v1/public/sdk/address?platform='+ (state.AndroidOrIOS?'1':'2') +'&appKind=' + appKind.substr(0,appKind.length - 1));
    fetchUtil.getJSON(apiUrl).then(data => {
      if(!this.state.showAddress){
        this.setState({
          showAddress:true
        })
      }
      this.setState({address:data.data.address})
    });
  }

  switchType (index) {
    let switcheList = this.state.switchList;
    if(switcheList.indexOf(true) !== switcheList.lastIndexOf(true)){
      switcheList[index] = !switcheList[index];
    }else {
      switcheList[index] = true;
    }
    this.setState({
      switchList:switcheList
    })
  }

  onCopy (address) {
    this.refs.address.select();
    document.execCommand("Copy");
  }

  render () {

    const { AndroidOrIOS, switchList, address, showAddress } = this.state;

    return(
      <div className={`tabs ${s.SDkDownload}`}>
        <ul className={`tabs-titles ${s.tabFilters}`}>
          <li className={cx(`tabs-item ${s.tabsStatus}`,{[s.active]:AndroidOrIOS})} onClick={() => this.handleClick(0)}>Android</li>
          <li className={cx(`tabs-item ${s.tabsStatus}`,{[s.active]:!AndroidOrIOS})} onClick={() => this.handleClick(1)}>ios</li>
        </ul>
        <div className={s.content}>
          <div className={s.download}>
            <h2 className={s.title}>1、示例工程下载</h2>
            <a href="#" className={`btn-primary ${s.action}`}>点击下载</a>
          </div>
          <div className={s.download}>
            <h2 className={s.title}>2、SDK下载(请先选择SDK需要<span>xxxx</span>)</h2>
            <ul className={s.list}>
              <li className={s.item}>
                <img src="http://timg.ffan.com/convert/resize/url_T1jBhTBvCb1RCvBVdK/tfs/1.png" className={s.typeImg}/>
                <div className="checkbox-item" onClick={() => this.switchType(0)}>
                  <i className={cx('iconfont', switchList[0]?'icon-radio':'icon-radio1')}/>
                  <span className={s.name}>FAP小程序</span>
                </div>
              </li>
              <li className={s.item}>
                <img src="http://timg.ffan.com/convert/resize/url_T1uBDTBsC_1RCvBVdK/tfs/1.png" className={s.typeImg}/>
                <div className="checkbox-item" onClick={() => this.switchType(1)}>
                  <i className={cx('iconfont', switchList[1]?'icon-radio':'icon-radio1')}/>
                  <span className={s.name}>HTML5</span>
                </div>
              </li>
              <li className={s.item} style={{'display':AndroidOrIOS?'block':'none'}}>
                <img src="http://timg.ffan.com/convert/resize/url_T1.sCTBbZT1RCvBVdK/tfs/1.png" className={s.typeImg}/>
                <div className="checkbox-item" onClick={() => this.switchType(2)}>
                  <i className={cx('iconfont', switchList[2]?'icon-radio':'icon-radio1')}/>
                  <span className={s.name}>APK</span>
                </div>
              </li>
            </ul>
            <span className={`btn-primary ${s.action}`} onClick={() => this.getUrl(this.state)}>点击获取</span>
            <div className={cx(`${s.copyLink}`,{[s.active]:showAddress})}>
              <input type="text" className={s.link} value={address} ref="address"/>
              <span className={s.copy} onClick={()=>this.onCopy(address)}>复制</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SDKDownload;
