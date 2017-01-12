import React from 'react'
import { Link } from 'react-router'
import fetchUtil from 'routes/utils/fetchUtil'
import { getDomain } from 'routes/utils/domain'
import debug from 'routes/utils/debug'
import moment from 'moment'
import Slidebar from 'components/Sidebar'
import 'styles/_base.scss'
import './index.scss'

class HardwareDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      tags:[]
    };
  }

  async getInfo() {
    let id = this.props.params.id;
    let apiUrl = getDomain(`http://api.intra.`, `ffan.net/bo/v1/web/hardware/getHardwareInfo/${id}`);
    try {
      let res = await fetchUtil.getJSON(apiUrl);
      if (res && res.status === 200) {
        res.data && this.formatData(res.data)
      } else {
        debug.warn("获取详情接口返回错误", res)
      }
    } catch (e) {
      debug.warn("获取详情接口返回错误", e)
    }
  }

  async getTags() {
    let apiUrl = getDomain(`http://api.intra.`, `ffan.net/bo/v1/public/common/tags?type=hardware`);
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res.status === 200) {
        res.data && this.setState({ tags: res.data })
      } else {
        debug.warn("获取标签接口返回错误", res)
      }
    } catch (e) {
      debug.warn("获取标签接口返回错误", e)
    }
  }

  formatData(data) {
    data.updateTime = data.updateTime && moment(parseInt(data.updateTime)).format('YYYY-MM-DD H:m:s')
    data.createTime = data.createTime && moment(parseInt(data.updateTime)).format('YYYY-MM-DD H:m:s')

    this.setState({data: data});
  }

  async componentDidMount() {
    await this.getInfo()
    await this.getTags()
    let { tags } = this.state
    tags.unshift({ tagId: 0, tagName: "全部" })
    tags.map((item, index)=> {
      item.aHref = (index == 0) ? `/hardware` : `/hardware?tagId=${item.tagId}`
    })
    this.setState({ tags: tags })
  }

  render() {
    let { data, tags } = this.state
    const infoTags = data.hardwareTags || []
    const hardwarePics = data.hardwarePics || []
    const len = infoTags.length
    const urls = {
      create: { url: `/hardware/create`, name: '发布新硬件' },
      list: { url: `/hardware/list`, name: '我的硬件' },
      doc: { url: `/hardware/doc` }
    }
    return (
      <div className="container clx">
        <Slidebar urls={urls} tags={tags} />
        <div className="sub-container bg-white">
          <div className="detail-container">
            <div className="detail-download">
              <img className="appImg" src={ data.hardwareLogo } alt="LOGO"/>
              <a className="btn btn-primary btn-download">购买</a>
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
                    <span className="tag">{ data.majorCategoryName } - </span>
                    <span className="tag">{ data.minorCategoryName }</span>
                  </td>
                </tr>
                <tr>
                  <td>标签</td>
                  <td>
                  {
                     infoTags.map( (item, index) => {
                       return (
                         <span className="tag">{item.tagName}{ (index < len - 1) ? `、` : '' }</span>
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
                <td className="text">
                { data.commType1 ? <span className="tag">WIFI</span> : '' }
                { data.commType2 ? <span className="tag">蓝牙</span> : '' }
                </td>
              </tr>
              <tr>
                <td className="title">详细功能描述</td>
                <td className="text">{ data.hardwareDetail }</td>
              </tr>
              <tr>
                <td className="title">SDK类型</td>
                <td className="text">{ data.sdkTypeName }</td>
              </tr>
              <tr>
                <td className="title">操作平台</td>
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