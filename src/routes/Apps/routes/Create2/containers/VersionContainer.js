import React from 'react'
import { connect } from 'react-redux'
import {getFormValues, Field, reduxForm} from 'redux-form'

import {
  postAppBasicInfo,
  getAppInfo
} from 'reducers/api'
import Version from '../components/Version'

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineVersion: '',
      initialValues: {
        codeDesc: 1111222
      },
      data: { 
        versions: []
      }
    }
  }

  componentDidMount() {
     getAppInfo({ appId: this.props.params.id }).then(data=>{
      
      console.log(data)
      const { versions } = data;
      const _version = versions.find((v)=>+v.publishStatus ===1)
      this.setState({
        initialValues: versions[0],
        onlineVersion: (_version && _version.codeVersion) || ''
      })

    }).then(e=>{

    })
  }

  componentWillMount() {
   
  }

  onSubmit (values) {
    console.log(values);

  }

  render () {
    const { onlineVersion, initialValues } = this.state;
    return <Version 
      initialValues={initialValues} 
      onSubmit={::this.onSubmit} 
      onlineVersion={onlineVersion}
    />
  }
}

export default connect()(Container)