import React from 'react'
import {
  postAppVersionInfo,
  getAppInfo
} from 'reducers/api'
import Version from '../components/Version'
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
    postAppVersionInfo({
      appId: this.props.params.id,
      prepareVersion: 1
    })

    getAppInfo(this.props.params.id).then(data=>{
      console.log(data)
      const { versions, appId, appKind } = data;
      const _version = versions.find((v)=>+v.publishStatus ===1)
      const { codeId, codeDesc, codeVersion, fileLink, autoPublish } = versions[0]
      let _files = null;
      if(+appKind !== 1) {
        _files = { fileLink };
      }
      
      this.setState({
        data,
        initialValues: {
          ...this.state.initialValues,
          ...versions[0],
          appId,
          appKind,
          _files
        },
        onlineVersion: (_version && _version.codeVersion) || ''
      })

    }).then(e=>{

    })
  }

  onSubmit (values) {
    console.log(values);
    // return
    const { _files, ...rest } = values;
    let params = { ...rest };
    if(_files) {
      params = {
        ...rest,
        ..._files
      }
    }
    postAppVersionInfo(params).then(data=>{
      console.log('操作成功：', data)
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

export default Container