import React from 'react'
import {
  postAppBasicInfo,
  postAppVersionInfo,
  getAppInfo,
} from 'reducers/api'

import Basic from '../components/Basic'

class Container extends React.Component {
  state = {
    initialValues: {}
  }

  componentDidMount() {
    const { id: appId } = this.props.params;
    getAppInfo(appId).then(data=>{
      console.log("data:", data)
      const { appKind, categoryId, platform, changes } = data;
      const { screenSize, appLogo, appDesc, appName, tags } = changes
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
      console.log('保存成功！', data);
      postAppVersionInfo({ appId: data.appId, prepareVersion: 1 }).then(()=>{
        this.props.router.push(`/apps/list`)
      })
    }).catch(e=>{
      alert(`保存失败(错误码：${e.status})`)
      console.log(e);
    })
  }

  render () {
    const { initialValues } = this.state;
    return (
      <Basic 
        pageType={'apps'} 
        appKind={initialValues.appKind}
        onSubmit={::this.onSubmit}
        params={this.props.params}
        initialValues={initialValues}
      />
    )
  }
}

export default Container