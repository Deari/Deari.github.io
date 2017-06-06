import React from 'react'
import Basic from '../components/Basic'
import { postAppBasicInfo } from 'reducers/api'
import { APP_TYPES } from 'config/appTypes'

class Container extends React.Component {
  state = {
    appType: APP_TYPES[this.props.params.type]
  }
  onSubmit (values) {
    const { appType } = this.state;
    let params = Object.assign({}, values, {
      appKind: appType.value,
      platform: appType.platform,
      categoryId: 8
    })

    postAppBasicInfo(params).then(data=>{
      const { type } = this.props.params;
      this.props.router.replace(`/apps/create/${type}/complete/${data.appId}`)
    }).catch(e=>{
      alert(`创建失败(错误码：${e.status})`)
    })
  }

  render () {
    const { appType } = this.state;
    return appType ? <Basic onSubmit={::this.onSubmit} appKind={appType.value} /> : null;
  }
}

export default Container