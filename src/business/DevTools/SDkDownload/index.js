import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'
import fetchUtil from 'utils/fetchUtil'
import { getDomain } from '../../../utils/d'

class SDKDownload extends React.Component {
  constructor () {
    super()
    this.state = {
      AndroidOrIOS: true,
      switchList: {
        'FAP': {
          switch: true,
          value: 0
        },
        'HTML5': {
          switch: true,
          value: 1
        },
        'APK': {
          switch: true,
          value: 2
        }
      },
      address: '',
      showAddress: false
    }
  }

  handleClick (index) {
    let AndroidOrIOS = this.state.AndroidOrIOS
    if ((this.state.AndroidOrIOS && index) || (!this.state.AndroidOrIOS && !index)) {
      AndroidOrIOS = !AndroidOrIOS
    }
    this.setState({
      AndroidOrIOS: AndroidOrIOS,
      showAddress: false,
      switchList: {'FAP': {switch: true, value: 0}, 'HTML5': {switch: true, value: 1}, 'APK': {switch: AndroidOrIOS, value: 2}}
    })
  }

  getUrl () {
    let appKind = '',
      switchList = this.state.switchList;
    for (let item in switchList) {
      appKind += switchList[item].switch?switchList[item].value + ',':'';
      if(!this.state.AndroidOrIOS && item === "HTML5") {
        break
      }
    }
    this.setState({address:''})
    let apiUrl = getDomain('/app/v1/bo/v1/public/sdk/address');
    fetchUtil.getJSON(
      apiUrl, {
        'platform':(this.state.AndroidOrIOS?'1':'2'),
        'appKind':appKind.substr(0,appKind.length - 1)
      }).then(data => {
      this.setState({
        address:data.data.address,
        showAddress:true
      })
    });
  }

  switchType (index) {
    let switcheList = this.state.switchList,
      onlyOne = 0;
    switcheList[index].switch = !switcheList[index].switch;
    for(let item in switcheList){
      switcheList[item].switch?onlyOne++:null
    }
    if(onlyOne === 0){
      switcheList[index].switch = true;
    }
    this.setState({
      switchList: switcheList
    })
  }

  onCopy (address) {
    this.refs.address.select()
    document.execCommand('Copy')
  }

  render () {

    const {AndroidOrIOS, switchList, address, showAddress} = this.state

    return (
      <div className={`tabs ${s.SDkDownload}`}>
        <ul className={`tabs-titles ${s.tabFilters}`}>
          <li className={cx(`tabs-item ${s.tabsStatus}`, {[s.active]: AndroidOrIOS})}
              onClick={() => this.handleClick(0)}>Android
          </li>
          <li className={cx(`tabs-item ${s.tabsStatus}`, {[s.active]: !AndroidOrIOS})}
              onClick={() => this.handleClick(1)}>ios
          </li>
        </ul>
        <div className={s.content}>
          <div className={s.download}>
            <h2 className={s.title}>1、示例工程下载</h2>
            <a href={AndroidOrIOS?'http://static.ffan.com/bo/ffoap_android_demo.zip':'http://static.ffan.com/bo/ffoap_ios_demo.zip'} className={`btn-primary ${s.action}`}>点击下载</a>
          </div>
          <div className={s.download}>
            <h2 className={s.title}>2、SDK下载(请先选择SDK需要<span>xxxx</span>)</h2>
            <ul className={s.list}>
              <li className={s.item}>
                <img src="http://timg.ffan.com/convert/resize/url_T1jBhTBvCb1RCvBVdK/tfs/1.png" className={s.typeImg}/>
                <div className="checkbox-item" onClick={() => this.switchType('FAP')}>
                  <i className={cx('iconfont', switchList['FAP'].switch ? 'icon-radio' : 'icon-radio1')}/>
                  <span className={s.name}>FAP小程序</span>
                </div>
              </li>
              <li className={s.item}>
                <img src="http://timg.ffan.com/convert/resize/url_T1uBDTBsC_1RCvBVdK/tfs/1.png" className={s.typeImg}/>
                <div className="checkbox-item" onClick={() => this.switchType('HTML5')}>
                  <i className={cx('iconfont', switchList['HTML5'].switch ? 'icon-radio' : 'icon-radio1')}/>
                  <span className={s.name}>HTML5</span>
                </div>
              </li>
              <li className={s.item} style={{'display': AndroidOrIOS ? 'block' : 'none'}}>
                <img src="http://timg.ffan.com/convert/resize/url_T1.sCTBbZT1RCvBVdK/tfs/1.png" className={s.typeImg}/>
                <div className="checkbox-item" onClick={() => this.switchType('APK')}>
                  <i className={cx('iconfont', switchList['APK'].switch ? 'icon-radio' : 'icon-radio1')}/>
                  <span className={s.name}>APK</span>
                </div>
              </li>
            </ul>
            <span className={`btn-primary ${s.action}`} onClick={() => this.getUrl()}>点击获取</span>
            <div className={cx(`${s.copyLink}`, {[s.active]: showAddress})}>
              <input type="text" className={s.link} value={address} ref="address"/>
              <span className={s.copy} onClick={() => this.onCopy(address)}>复制</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SDKDownload
