import React from 'react'
import {
  postAppBasicInfo,
  getAppInfo,
} from 'reducers/api'

import Basic from '../components/Basic'

import { APP_TYPES } from 'config/appTypes'

class Container extends React.Component {
  state = {
    initialValues: {}
  }

  componentDidMount() {
    const { id: appId } = this.props.params;
    getAppInfo({ appId }).then(data=>{
      const { screenSize, appKind, appLogo, appDesc, appName, tags, categoryId, platform } = data;
      this.setState({
        initialValues: {
          appId, appKind, appLogo, screenSize, appDesc, appName, categoryId, platform,
          tags: tags.map(v=>v.tagId)
        }
      })
    }).catch(e=>{
      console.log(e)
    })
  }

  onSubmit (values) {
    postAppBasicInfo({
      ...values,
    }).then(data=>{
      alert('保存成功！');
      this.props.router.push(`/apps/list`)
    }).catch(e=>{
      alert(`保存失败(错误码：${e.status})`)
    })
  }

  render () {
    const { type } = this.props.params;
    const { initialValues } = this.state;

    return APP_TYPES[type] ? <Basic pageType={'apps'} onSubmit={::this.onSubmit}
      params={ this.props.params }
      initialValues={initialValues}
      appType={APP_TYPES[type]} /> : null;
  }
}

export default Container