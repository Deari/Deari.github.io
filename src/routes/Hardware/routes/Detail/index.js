import React from 'react'
import { Link } from 'react-router'
import fetchUtil from '../../../utils/fetchUtil'
import { getDomain } from '../../../utils/domain';
import moment from 'moment'
import Slidebar from '../../../../components/Sidebar'
import '../../../../styles/_base.scss'
import './index.scss'

class HardwareDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    let id = this.props.params.id;
    let apiUrl = getDomain(`http://api.intra.`, `ffan.net/bo/v1/web/hardware/getHardwareInfo/${id}`);
    try {
      let res = await fetchUtil.getJSON(apiUrl);
      if (res && res.status === 200) {
        res.data && this.setState({data: res.data});
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    let { data } = this.state
    const tags = data.hardwareTags || []
    const hardwarePics = data.hardwarePics || []
    const len = tags.length
    const urls = {
      create: { url: `/hardware/create` },
      list: { url: `/hardware/list` },
      doc: { url: `/hardware/doc` }
    }
    return (
      <div className="container clx">
        <Slidebar urls={urls} type='hardware'/>
        <div className="sub-container bg-white">
          <div className="detail-container">
            <div className="detail-download">
              <img className="appImg" src={ data.appLogo } alt="LOGO"/>
              <a className="btn btn-primary btn-download" href={ data.fileLink } target="_blank" download="">下载</a>
            </div>
            <div className="detail-info">
              <dl className="detail-tittle">
                <dt>{ data.hardwareName }</dt>
                <dd><i className="user-img"></i>{ data.hardwareProducer }</dd>
              </dl>
              <h3 className="app-title">内容提要</h3>
              <p className="app-text">{ data.hardwareFunction }</p>
              <h3 className="app-title">信息</h3>
              <table className="infomation-list">
                <tr>
                  <td>类别</td>
                  <td>
                    <a className="tag" href="">{ data.majorCategoryName } - </a>
                    <a className="tag" href="">{ data.minorCategoryName }</a>
                  </td>
                </tr>
                <tr>
                  <td>标签</td>
                  <td>
                  {
                     tags.map( (item, index) => {
                       return (
                         <a className="tag">{item.tagName}{ (index < len - 1) ? `、` : '' }</a>
                       )
                     } )
                  }
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="table-info hardware-info">
            <h3 className="app-title">硬件信息</h3>
            <table className="detail-table">
              <tr>
                <td className="title">发布时间</td>
                <td className="text">{ data.createTime }</td>
              </tr>
              <tr>
                <td className="title">硬件型号</td>
                <td className="text">{ data.hardwareMode }</td>
              </tr>
              <tr>
                <td className="title">硬件品牌</td>
                <td className="text">{ data.hardwareBrand }</td>
              </tr>
              <tr>
                <td className="title">生产厂家</td>
                <td className="text">{ data.hardwareProducer }</td>
              </tr>
              <tr>
                <td className="title">通讯方式</td>
                { data.commType1 ? <td className="text">WIFI</td> : '' }
                { data.commType2 ? <td className="text">蓝牙</td> : '' }
              </tr>
              <tr>
                <td className="title">详情功能描述</td>
                <td className="text">{ data.hardwareDetail }</td>
              </tr>
              <tr>
                <td className="title">SDK类型</td>
                <td className="text">{ data.sdkTypeName }</td>
              </tr>
              <tr>
                <td className="title">操作系统</td>
                <td className="text">{ data.osName }</td>
              </tr>
              <tr>
                <td className="title">硬件平台</td>
                <td className="text">{ data.hardwarePlatformName }</td>
              </tr>
              <tr>
                <td className="title">硬件图片</td>
                <td className="text">
                {
                  hardwarePics.map( (item, index) => (
                    <div className="img-block">
                      <img className="img" src={item} />
                    </div>
                   ) )
                }
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = (store) => ({
  path: 'detail/:id',
  component: HardwareDetail
})