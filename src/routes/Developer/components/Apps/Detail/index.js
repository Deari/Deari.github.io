import React from 'react'
import Version from '../../../../../components/Versions'
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
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/developer/app/1/codes`
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
        res && res.versions && this.setState({ data: res.versions });
      }
    )
  }
  async showBasicInfo() {
    if(!this.state.showVersion) return;
    this.setState({showVersion: false});
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/app/1`;
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if (res.status == 200) {
        res.data && this.setState({ data: res.data });
      }
    } catch(e) {
      console.log(e);
    }
  }
  showVersion() {
    if(this.state.showVersion) return;
    this.getVersions().then(
      res => {
        res && res.versions && this.setState({ data: res.versions });
        this.setState({showVersion: true});
      }
    )
  }
  render() {
    return (
      <div className="cContent clx">
        <div className="col-sm-2 col-md-2 navThird">
          <ul>
            <li className={this.state.showVersion ? '' : 'navThirdHover'} 
                onClick={this.showBasicInfo.bind(this)}>基本信息</li>
            <li className={this.state.showVersion ? 'navThirdHover' : ''} 
                onClick={this.showVersion.bind(this)}>版本管理</li>
          </ul>
        </div>
        <div className="col-sm-10 col-md-10">
          <div className="ccContent">
          {
            this.state.showVersion ? (this.state.data ?
              <Version data={this.state.data} 
                       linkUrl={this.state.data[0] && this.state.data[0].appId ? 
                       `/developer/apps/edit/${this.state.data[0].appId}` : ''} /> : 
              React.createElement("div", {}, "页面加载中...") ) : 
              <BasicInfo data={this.state.data} />
          }
          </div>
        </div>
      </div>
    )
  }
}

export default AppsDetail;