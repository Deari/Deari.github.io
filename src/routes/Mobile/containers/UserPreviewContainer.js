import React, { Component } from 'react'
import UserPreview from '../components/UserPreview'
import fetchUtil from '../../utils/fetchUtil'

const promised = {
  promise: fetchUtil.getJSON('http://api.intra.sit.ffan.net/bo/v1/web/merchant/page/3')
}

const defaultView = {
  "elements": [ {
    "id": "XRUOKKU",
    "selected": false,
    "merchantId": 10025585,
    "appId": 205,
    "appType": 2,
    "codeId": 157,
    "isUsed": 0,
    "createTime": "1483008549",
    "updateTime": "1483008559",
    "pageKey": "app_205",
    "nativeAppId": 1,
    "appName": "默认组件名1",
    "appDesc": "fdcvxbcxv",
    "appThumb": "",
    "appPreviewImage": "http://img1.ffan.com/T1kcVTB5b_1RCvBVdK",
    "defaultLayout": { "w": 1, "h": 1 },
    "appLogo": "https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/xingzuo/big/24/juxie.png",
    "platform": 2,
    "categoryId": 3,
    "moduleName": "test",
    "appkey": "e876b4a268ecdf4d78cdc28a0f561124",
    "developerId": 1,
    "developerName": ""
  } ], "layouts": [ { "i": "XRUOKKU", "w": 1, "h": 1, "x": 0, "y": 0 } ]
}

export const Promised = (promiseProp, Wrapped) => class extends Component {

  state = {
    preview: {
      elements: [],
      layouts: [],
    }
  }

  componentDidMount() {
    promiseProp.promise.then(v => {
      try {
        if (typeof v.data.viewData === 'string') {
          v.data.viewData = JSON.parse(v.data.viewData)
        }
        this.setState({ preview: v.data.viewData })
      } catch (e) {
        this.setState({
          preview: defaultView
        })
      }

    })
  }

  render() {
    return <Wrapped {...this.state.preview} />
  }
}

export default Promised(promised, UserPreview)
