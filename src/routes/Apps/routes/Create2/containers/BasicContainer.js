import React from 'react'
import { connect } from 'react-redux'
import { getFormValues, Field, reduxForm } from 'redux-form'

import {
  postAppBasicInfo,
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

  componentDidMount() {
  }
  componentWillMount() {
    fetchTags().then(data=>{
      this.setState({
        tags: data
      })
    })
  }

  onSubmit (values) {
    const { appType } = this.state;
    const { tags, ...rest } = values;
    postAppBasicInfo({
      ...values,
      appKind: appType.value,
      platform: appType.platform,
      categoryId: 8
    }).then(data=>{
      console.log('操作成功：', data)
      this.props.router.replace(`/apps/create2/h5/complete/${data.appId}`)
    }).catch(e=>{
      alert(`操作失败(错误码：${e.status})`)
    })
  }

  render () {
    const { appType, step } = this.state;
    
    if(appType) {
      return <Basic type={'apps'}
        appType={appType.text}
        tagSource={this.state.tags} 
        onSubmit={::this.onSubmit} 
      />
    }
    return null;
  }
}

export default connect()(Container)