import React from 'react'
import { connect } from 'react-redux'
import { getFormValues, Field, reduxForm } from 'redux-form'

import {
  postAppVersionInfo,
  getAppInfo
} from 'reducers/api'
import Version from '../components/Version'
// import Version from 'business/AppCreate/Version'
import { APP_TYPES } from 'config/appTypes'

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineVersion: '',
      initialValues: {
        autoPublish: 0
      },
      data: { }
    }
  }

  componentWillMount() {
    getAppInfo(this.props.params.id).then(data=>{
      console.log(data)
      const { versions, appId, appKind } = data;
      const _version = versions.find((v)=>+v.publishStatus ===1)
      const { codeId, codeDesc, codeVersion, fileLink, autoPublish, showUpdateMsg } = versions[0]
      this.setState({
        data,
        initialValues: {
          ...this.state.initialValues,
          ...versions[0],
          appId,
          appKind
        },
        onlineVersion: (_version && _version.codeVersion) || ''
      })

    }).then(e=>{

    })
  }

  onSubmit (values) {
    console.log(values);
    postAppVersionInfo(values).then(data=>{
      console.log('操作成功：', data)
      // this.props.router.replace(`/apps/create2/h5/complete/${data.appId}`)
    }).catch(e=>{
      alert(`操作失败(错误码：${e.status})`)
    })
  }

  render () {
    const { onlineVersion, initialValues } = this.state;
    return <Version pageType={'apps'}
      params={ this.props.params }
      initialValues={initialValues} 
      onSubmit={::this.onSubmit} 
      onlineVersion={onlineVersion}
    />
  }
}

export default connect()(Container)