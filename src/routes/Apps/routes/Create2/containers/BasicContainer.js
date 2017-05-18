import React from 'react'
import { connect } from 'react-redux'
import {getFormValues, Field, reduxForm} from 'redux-form'

import {
  postAppBasicInfo,
  fetchTags
} from 'reducers/api'
import Basic from '../components/Basic'

const AppTypes = {
  h5: {
    text: 'H5',
    value: 1,
    platform: 0,
  },
  apk: {
    text: 'APK',
    value: 2,
    platform: 0,
  },
  mini_program: {
    text: 'FAP小程序',
    value: 0,
    platform: 3
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    const { type } = this.props.params;
    const appType = AppTypes[type]
    this.state = {
      appType,
      tags: [],
      step: 'create'
    }
  }

  componentDidMount() {
    console.log(this.state.appType);
  }
  componentWillMount() {
    fetchTags().then(data=>{
      this.setState({
        tags: data
      })
    })
  }

  onSubmit (values) {
    return this.props.router.replace('/apps/create2/h5/complete/2015')
    
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
      return <Basic appType={appType} tagSource={this.state.tags} onSubmit={::this.onSubmit}></Basic>
    }
    return null;
  }
}

export default connect((state)=>{
  return {
    formValues: getFormValues('create_apps')(state) || {},
  }
})(Container)