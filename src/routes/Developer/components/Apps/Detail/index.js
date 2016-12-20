import React from 'react'
import Version from '../../../../../components/Version'
import fetchUtil from '../../../../utils/fetchUtil'
import BasicInfo from './BasicInfo'

class AppsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      showVersion: true,
      data: null
    };
  }
  async getVersions() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/developer/1/app/1/code`
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if (res.status === 200) {
        return res.data;
      } else {
        console.log("res ", res);
      }
    } catch (e) {
      console.log(e);
    }
  }
  componentDidMount() {
    this.getVersions().then(
      res => {
        console.log("response ", res)
        this.versions = res.versions;
        res && res.versions && this.setState({ data: res.versions });
      }
    )
  }
  async showBasicInfo() {
    this.setState({showVersion: false});
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/app/1`;
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if (res.status == 200) {
        this.basicInfo = res.data;
        res.data && this.setState({ data: res.data });
      }
    } catch(e) {
      console.log(e);
    }
  }
  async showVersion() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/developer/1/app/1/code`
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if (res.status === 200) {
        this.versions = res.data.versions;
        res.data && res.data.versions && this.setState({ data: res.data.versions });
        this.setState({showVersion: true});
      } else {
        console.log("res ", res);
      }
    } catch (e) {
      console.log(e);
    }
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
          this.state.showVersion ? (this.state.data ?
            <Version data={this.state.data} linkUrl="/developer/apps/876/edit" /> : 
            React.createElement("div", {}, "页面加载中...") ) : 
            <BasicInfo data={this.state.data} />
        }
        </div>
      </div>
    )
  }
}

export default AppsDetail;