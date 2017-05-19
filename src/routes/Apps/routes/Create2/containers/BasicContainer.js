import React from 'react'
import Basic from '../components/Basic'
import { postAppBasicInfo } from 'reducers/api'
import { APP_TYPES } from 'config/appTypes'

class Container extends React.Component {
  
  onSubmit (values) {
    const { type } = this.props.params;
    const appType = APP_TYPES[type];
    let params = Object.assign({}, values, {
      appKind: appType.value,
      platform: appType.platform,
      categoryId: 8
    })

    postAppBasicInfo(params).then(data=>{
      console.log('创建成功：', data)
      // this.props.router.replace(`/apps/create2/h5/complete/${data.appId}`)
    }).catch(e=>{
      alert(`创建失败(错误码：${e.status})`)
    })
  }

  render () {
    const { type } = this.props.params;
    return APP_TYPES[type] ? <Basic pageType={'apps'} onSubmit={::this.onSubmit}
      appKind={APP_TYPES[type].value}
      appType={APP_TYPES[type]} /> : null;
  }
}

export default Container