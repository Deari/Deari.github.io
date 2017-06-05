import React from 'react'
import {
  postWidgetVersionInfo,
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
    postWidgetVersionInfo({
      appId: this.props.params.id,
      prepareVersion: 1
    }).then(()=>{
      return this.initInfo()
    }).catch(e=>{
      console.log(e);
    })
  }

  initInfo() {
    return getAppInfo(this.props.params.id).then(data=>{
      const { versions, appId, appKind, relations, moduleName } = data;
      const _version = versions.find((v)=>+v.publishStatus ===1)
      const { codeId, codeDesc, codeVersion, showUpdateMsg, fileName, fileLink, autoPublish } = versions[0]
      let _files = null;
      if(+appKind !== 1) {
        _files = { fileLink, fileName };
      }
      console.log(versions[0].codeSetting, JSON.parse(versions[0].codeSetting));

      this.setState({
        data,
        initialValues: {
          ...this.state.initialValues,
          ...versions[0],
          moduleName,
          appId,
          appKind,
          relations,
          _files
        },
        onlineVersion: (_version && _version.codeVersion) || ''
      })
    })
  }

  save(values) {
    this.onSubmit(values)
  }

  publish(values) {
    this.onSubmit(values, 1)
  }

  onSubmit (values, commit) {
    
    const { _files, codeSetting=[], relations, ...rest } = values;
    let params = { ...rest };
    if(_files) {
      params = {
        ...rest,
        ..._files,
        setting: codeSetting
      }
    }
    
    Object.assign(params, {
      relatedApps: relations.apps.map(v=>v.appId),
      relatedWidgets: relations.widgets.map(v=>v.appId),
      commit: commit || ''
    })

    postWidgetVersionInfo(params).then(data=>{
      if(commit) {
        this.props.router.push(`/apps/edit/${this.props.params.id}/complete`)
      } else {
        alert('保存成功！');
      }
    }).catch(e=>{
      alert(`操作失败(错误码：${e.status})`)
    })
  }

  render () {
    const { onlineVersion, initialValues } = this.state;
    return <Version pageType={'apps'}
      params={ this.props.params }
      initialValues={initialValues} 
      save={::this.save} 
      publish={::this.publish}
      onlineVersion={onlineVersion}
    />
  }
}

export default Container