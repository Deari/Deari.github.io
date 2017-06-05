import React from 'react'
import {
  postWidgetBasicInfo,
  postWidgetVersionInfo,
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
      const { appKind, categoryId, platform, changes, defaultLayout } = data;
      const { appLogo, appDesc, appPreviewImage, appName, tags } = changes
      this.setState({
        initialValues: {
          appLogo, appDesc, appPreviewImage, appName,
          appId, appKind, categoryId, platform,
          tags: tags.map(v=>v.tagId),
          defaultLayout
        }
      })
    }).catch(e=>{
      console.log(e)
    })
  }

  onSubmit (values) {
    console.log(values)
    const { defaultLayout, ...rest } = values;
    postWidgetBasicInfo(rest).then(data=>{
      console.log('保存成功！', data);
      this.props.router.push(`/widgets/edit/${data.appId}/version`)
      
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
        isEditMode={true}
        initialValues={initialValues}
      />
    )
  }
}

export default Container