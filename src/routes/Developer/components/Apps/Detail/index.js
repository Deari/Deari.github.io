import React from 'react'
import Version from '../../../../../components/Version'
import fetchUtil from '../../../../utils/fetchUtil'

class AppsDetail extends React.Component {
  state = {
    data: []
  }

  async componentDidMount() {
    
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/developer/1/app/1`
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      console.log(res.data)
      if (res.status === 200) {
        alert('成功')
        this.setState({ data: res.data })
      }
    } catch (e) {
      alert('失败')
      console.log(e)
    }

  }

  render() {

    return (
      <Version data={this.state.data} linkUrl="/developer/apps/876/edit" />
    )
  }
}

export default AppsDetail;