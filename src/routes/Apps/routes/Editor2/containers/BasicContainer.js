import React from 'react'
import {
  postAppBasicInfo,
  postAppVersionInfo,
  getAppInfo,
} from 'reducers/api'

import Basic from '../components/Basic'
import ErrorManager from 'config/error'

class Container extends React.Component {
  state = {
    initialValues: {}
  }

  componentDidMount() {
    const { id: appId } = this.props.params;
    getAppInfo(appId).then(data=>{
      
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

  onSubmit (values, gotoNext) {
    postAppBasicInfo({
      ...values,
    }).then(data=>{
      console.log('保存成功！', data);
      const { id: appId } = this.props.params;
      
      if(gotoNext == 1) {
        this.props.router.push(`/apps/edit/${appId}/version`)
      } else {
        alert('保存成功！')
      }
    }).catch(e=>{
      const msg = ErrorManager[e.status] || '创建失败';
      alert(`${msg}(错误码：${e.status})`)
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
        editMode={true}
        initialValues={initialValues}
      />
    )
  }
}

export default Container