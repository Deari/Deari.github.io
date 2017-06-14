import React from 'react'
import {
  postWidgetBasicInfo,
  postWidgetVersionInfo,
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

  onSubmit (values, gotoNext) {
    const { id: appId } = this.props.params;
    const { defaultLayout, ...rest } = values;
    postWidgetBasicInfo(rest).then(data=>{
      if(gotoNext == 1) {
        this.props.router.push(`/widgets/edit/${appId}/version`)
      } else {
        alert('保存成功！')
      }
    }).catch(e=>{
      console.log(e);
      const msg = ErrorManager[e.status] || '操作失败';
      alert(`${msg}(错误码：${e.status})`)
    })
  }

  render () {
    const { initialValues } = this.state;
    return (
      <Basic 
        pageType={'apps'} 
        onSubmit={::this.onSubmit}
        params={this.props.params}
        editMode={true}
        initialValues={initialValues}
      />
    )
  }
}

export default Container