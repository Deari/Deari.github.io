import React, { Component } from 'react'
import UserPreview from '../components/UserPreview'
import fetchUtil from '../../utils/fetchUtil'

const promised = {
  promise: fetchUtil.getJSON('http://api.intra.sit.ffan.net/bo/v1/web/merchant/page/3')
}

const defaultView = {
  "elements": [
    {
      "id": "JCUQERY",
      "selected": false,
      "merchantId": 10025585,
      "appId": 225,
      "appType": 2,
      "codeId": 165,
      "isUsed": 0,
      "createTime": "1483016227",
      "updateTime": "1483016237",
      "pageKey": "app_225",
      "nativeAppId": 1,
      "appName": "支付",
      "appDesc": "支付",
      "appThumb": "",
      "appPreviewImage": "http://img1.ffan.com/T1FUWTBCZv1RCvBVdK",
      "defaultLayout": {
        "w": 1,
        "h": 1
      },
      "appLogo": "http://img1.ffan.com/T1wUKTBmhj1RCvBVdK",
      "platform": 2,
      "categoryId": 5,
      "moduleName": "test",
      "appkey": "4d2eb9829cd4a35dfdd36b5dd969ef4f",
      "developerId": 1,
      "developerName": ""
    },
    {
      "id": "QFIRRLQ",
      "selected": true,
      "merchantId": 10025585,
      "appId": 224,
      "appType": 2,
      "codeId": 164,
      "isUsed": 0,
      "createTime": "1483016147",
      "updateTime": "1483016154",
      "pageKey": "app_224",
      "nativeAppId": 1,
      "appName": "商品",
      "appDesc": "商品",
      "appThumb": "",
      "appPreviewImage": "http://img1.ffan.com/T177ETBmJT1RCvBVdK",
      "defaultLayout": {
        "w": 2,
        "h": 1
      },
      "appLogo": "http://img1.ffan.com/T17UETBTDj1RCvBVdK",
      "platform": 2,
      "categoryId": 4,
      "moduleName": "test",
      "appkey": "cd65d04cce048f58baab7bfb70c3f6b3",
      "developerId": 1,
      "developerName": ""
    },
    {
      "id": "QAGVWDU",
      "selected": false,
      "merchantId": 10025585,
      "appId": 221,
      "appType": 2,
      "codeId": 161,
      "isUsed": 0,
      "createTime": "1483015879",
      "updateTime": "1483015889",
      "pageKey": "app_221",
      "nativeAppId": 1,
      "appName": "WiFi",
      "appDesc": "這是wifi",
      "appThumb": "",
      "appPreviewImage": "http://img1.ffan.com/T1jcxTBvLg1RCvBVdK",
      "defaultLayout": {
        "w": 1,
        "h": 1
      },
      "appLogo": "http://img1.ffan.com/T1O6VTB5W_1RCvBVdK",
      "platform": 2,
      "categoryId": 2,
      "moduleName": "test",
      "appkey": "79d2526348c23b90c60c98be13f3fae3",
      "developerId": 1,
      "developerName": ""
    },
    {
      "id": "OXSBUTP",
      "selected": false,
      "merchantId": 10025585,
      "appId": 222,
      "appType": 2,
      "codeId": 162,
      "isUsed": 0,
      "createTime": "1483015961",
      "updateTime": "1483015972",
      "pageKey": "app_222",
      "nativeAppId": 1,
      "appName": "停車",
      "appDesc": "停車",
      "appThumb": "",
      "appPreviewImage": "http://img1.ffan.com/T100JTByZT1RCvBVdK",
      "defaultLayout": {
        "w": 2,
        "h": 1
      },
      "appLogo": "http://img1.ffan.com/T1DmVTB5D_1RCvBVdK",
      "platform": 2,
      "categoryId": 2,
      "moduleName": "test",
      "appkey": "68b2cd833e452f8d62a925d0e50966b8",
      "developerId": 1,
      "developerName": ""
    },
    {
      "id": "DJZUQZP",
      "selected": false,
      "merchantId": 10025585,
      "appId": 223,
      "appType": 2,
      "codeId": 163,
      "isUsed": 0,
      "createTime": "1483016047",
      "updateTime": "1483016054",
      "pageKey": "app_223",
      "nativeAppId": 1,
      "appName": "广告",
      "appDesc": "广告",
      "appThumb": "",
      "appPreviewImage": "http://img1.ffan.com/T1XUVTBQZv1RCvBVdK",
      "defaultLayout": {
        "w": 2,
        "h": 2
      },
      "appLogo": "http://img1.ffan.com/T1Y6ATBQhv1RCvBVdK",
      "platform": 2,
      "categoryId": 4,
      "moduleName": "test",
      "appkey": "199e66086114e463773060b830258dcf",
      "developerId": 1,
      "developerName": ""
    }
  ],
  "layouts": [
    {
      "i": "JCUQERY",
      "w": 2,
      "h": 1,
      "x": 0,
      "y": 2
    },
    {
      "i": "QFIRRLQ",
      "w": 2,
      "h": 2,
      "x": 0,
      "y": 0
    },
    {
      "i": "QAGVWDU",
      "w": 1,
      "h": 1,
      "x": 0,
      "y": 3
    },
    {
      "i": "OXSBUTP",
      "w": 1,
      "h": 1,
      "x": 1,
      "y": 3
    },
    {
      "i": "DJZUQZP",
      "w": 2,
      "h": 2,
      "x": 0,
      "y": 4
    }
  ]
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
        //console.log("ssssssssssssssss")
        //console.log(v.data.viewData)
        this.setState({ preview: v.data.viewData })
      } catch (e) {
        console.log('---UserView data error')
        console.log(e)
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
