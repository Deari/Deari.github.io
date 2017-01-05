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
        res.data && this.formatData(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  formatData(data) {
    data.updateTime = data.updateTime && moment(parseInt(data.updateTime)).format('YYYY-MM-DD H:m:s')
    data.createTime = data.createTime && moment(parseInt(data.updateTime)).format('YYYY-MM-DD H:m:s')
    this.setState({data: data});
  }
  render() {
    let { data } = this.state
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
                <dt>应用名称-{ data.appName }</dt>
                <dd><i className="user-img"></i>极速数据（企业）</dd>
              </dl>
              <h3 className="app-title">内容提要</h3>
              <p className="app-text">提供店内WIFI入口，顾客点击此入口后，只需要输入手机号以及
              验证码，便可一健上网，同时，商家可将此顾客默认成为本店会员。</p>
              <h3 className="app-title">信息</h3>
              <table className="infomation-list">
                <tr>
                  <td>类别</td>
                  <td>
                    <a className="tag" href="">Wifi</a>
                  </td>
                </tr>
                <tr>
                  <td>标签</td>
                  <td>
                    <a className="tag" href="">智能</a> 、
                    <a className="tag" href="">营销互动</a>
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
                <td className="text">2016年12月21日</td>
              </tr>
              <tr>
                <td className="title">硬件型号</td>
                <td className="text">0.1.6</td>
              </tr>
              <tr>
                <td className="title">硬件品牌</td>
                <td className="text">迈外迪</td>
              </tr>
              <tr>
                <td className="title">生产厂家</td>
                <td className="text">迈外迪</td>
              </tr>
              <tr>
                <td className="title">通讯方式</td>
                <td className="text">Wifi</td>
              </tr>
              <tr>
                <td className="title">详情功能描述</td>
                <td className="text">Lorem ipsum dolor sit amet,consectetur adipiscing elit.
                Aenean euismod bibendum laoreet.Proin gravida dolor sit amet lacus accumsan elit</td>
              </tr>
              <tr>
                <td className="title">SDK类型</td>
                <td className="text">串口接入</td>
              </tr>
              <tr>
                <td className="title">操作系统</td>
                <td className="text">Android系统</td>
              </tr>
              <tr>
                <td className="title">操作平台</td>
                <td className="text">stm321407</td>
              </tr>
              <tr>
                <td className="title">硬件图片</td>
                <td className="text">
                  <div className="img-block">
                    <p className="img-text">加载中</p>
                    <img className="img" src="" />
                  </div>
                  <div className="img-block">
                    <p className="img-text">加载中</p>
                    <img className="img" src="" />
                  </div>
                  <div className="img-block">
                    <p className="img-text">加载中</p>
                    <img className="img" src="" />
                  </div>
                  <div className="img-block">
                    <p className="img-text">加载中</p>
                    <img className="img" src="" />
                  </div>
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