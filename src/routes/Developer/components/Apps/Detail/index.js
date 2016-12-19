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
  showBasicInfo() {
    this.setState({showVersion: false});
  }
  showVersion() {
    this.setState({showVersion: true});
  }
  render() {
    return (
      <div className="cContent">
        <div className="navThird">
          <ul>
            <li className={this.state.showVersion ? '' : 'navThirdHover'} 
                onClick={this.showBasicInfo.bind(this)}>基本信息</li>
            <li className={this.state.showVersion ? 'navThirdHover' : ''} 
                onClick={this.showVersion.bind(this)}>版本管理</li>
          </ul>
        </div>
        <div className="ccContent">
        {
          this.state.showVersion ? 
          <Version data={this.state.data} linkUrl="/developer/apps/876/edit" /> :
          <BasicInfo />
        }
        </div>
      </div>
    )
  }
}

class BasicInfo extends React.Component {
  render() {
    return (
      <div>
        <img />
        应用名称: 名称
        分类：分类3
        描述：撒打发斯蒂芬
        标签：标签一 标签二
      </div>

    )
  }
}

export default AppsDetail;