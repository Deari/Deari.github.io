import React from 'react'
import { connect } from 'react-redux'
import { getFormValues, Field, reduxForm } from 'redux-form'

import {
  postAppBasicInfo,
  getAppInfo,
  fetchTags
} from 'reducers/api'

import Basic from '../components/Basic'

// import Basic from 'business/AppCreate/Basic'
import { AppTypes } from 'config/AppType'

class Container extends React.Component {
  constructor(props) {
    super(props);
    const { type } = this.props.params;
    const appType = AppTypes[type]
    this.state = {
      appType,
      tags: []
    }
  }

  
  componentWillMount() {
    fetchTags().then(data=>{
      this.setState({
        tags: data
      })
    })

    getAppInfo({ appId: this.props.params.id }).then(data=>{
      const { appId, screenSize, appKind, appLogo, appDesc, appName, tags, categoryId, platform } = data;
      this.setState({
        initialValues: {
          appId, appKind, appLogo, screenSize, appDesc, appName, categoryId, platform,
          tags: tags.map(v=>v.tagId)
        }
      })

    }).then(e=>{

    })
  }

  onSubmit (values) {
    postAppBasicInfo({
      ...values,
    }).then(data=>{
      alert('保存成功！');
      this.props.router.push(`/apps/list`)
    }).catch(e=>{
      alert(`操作失败(错误码：${e.status})`)
    })
  }

  render () {
    const { appType, initialValues } = this.state;
    const { id, type } = this.props.params; 

    if(appType) {
      return <Basic
        type={type}
        id={id}
        appType={appType.text}
        initialValues={initialValues}
        tagSource={this.state.tags} 
        onSubmit={::this.onSubmit} 
      />
    }
    return null;
  }
}

export default connect()(Container)