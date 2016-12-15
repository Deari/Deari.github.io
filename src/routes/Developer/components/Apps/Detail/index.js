import React from 'react'
import Version from '../../../../../components/Version'

class AppsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        codeVersion: '0.2.0.2312',
        code_desc: 'asdfasdfasdfasdfasdsdfa'
      }
    };
  }
  render() {
    return (
      <Version data={this.state.data} linkUrl="/developer/apps/876/edit" />
    )
  }
}

export default AppsDetail;