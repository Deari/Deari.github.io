import React from 'react'
import { Link } from 'react-router'
import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'utils/debug'
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

  async getInfo(e) {
    let id = this.props.params.id;
    let apiUrl = getDomain(`web/hardware/getHardwareInfo/${id}`);
    try {
      let res = await fetchUtil.getJSON(apiUrl);
      if (res && res.status === 200) {
        res.data && this.formatData(res.data)
      } else {
        debug.warn("获取详情接口返回错误")
      }
    } catch (e) {
      console.log("获取详情接口返回错误", e)
    }
  }

  async getTags(e) {
    let apiUrl = getDomain(`public/common/tags?type=hardware`);
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res.status === 200) {
        res.data && this.setState({ tags: res.data })
      } else {
        debug.warn("获取标签接口返回错误")
      }
    } catch (e) {
      console.log("获取标签接口返回错误", e)
    }
  }

  formatData(data) {
    data.updateTime = data.updateTime && moment(data.updateTime * 1000).format("YYYY-MM-DD H:m:s")
    data.createTime = data.createTime && moment(data.createTime * 1000).format("YYYY-MM-DD H:m:s")

    this.setState({data: data});
  }

  async componentDidMount() {
    await this.getInfo()
    await this.getTags()
    let { tags } = this.state
    tags.unshift({ tagId: 0, tagName: "全部标签" })
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
        <div className="sub-container">
          <div className="detail-container bg-white">
            <div className="detail-returnnav">
              <p>返回</p>
            </div>
            <div className="detail-img">
              <img className="appImg" src={ data.hardwareLogo } alt="LOGO"/>
              <a className="detail-start"><i className="iconfont icon-uncollected icon-uncollected2"></i><span>收藏</span></a>
            </div>
            <div className="detail-info">
              <dl className="detail-tittle">
                <dt>{ data.hardwareName }</dt>
                <dd><i className="user-img"></i><span>{ data.hardwareProducer }</span></dd>
              </dl>
              <h5 className="detail-title"><i className="detail-title-dot"></i>硬件介绍:</h5>
              <p className="detail-introduce">{ data.hardwareFunction }</p>
              <h5 className="detail-title"><i className="detail-title-dot"></i>类别:
                <span className="detail-genre">
                  <i className="tag">{ data.majorCategoryName } - </i>
                  <i className="tag">{ data.minorCategoryName }</i>
                </span>
              </h5>
              <h5 className="detail-title"><i className="detail-title-dot"></i>标签:
                <span className="detail-label">
                  {
                    infoTags.map( (item, index) => {
                      return (
                        <i>{item.tagName}{ (index < len - 1) ? `、` : '' }</i>
                      )
                    } )
                  }
                  <i>酒店</i>
                </span>
              </h5>
              <h5 className="detail-title"><i className="detail-title-dot"></i>已售:
                <span className="detail-sold">180件</span>
              </h5>
              <h5 className="detail-title"><i className="detail-title-dot"></i>价格 :
                <span className="detail-price">￥200<i>元</i></span>
              </h5>
            </div>
          </div>
          <div className="detail-table-box bg-white">
            <ul className="detail-table-nav">
              <li><a className="active">商品介绍</a></li>
              <li><a>规格参数</a></li>
              <li><a>评论(180)</a></li>
            </ul>
            <div className="detail-table-content">
              <h5 className="detail-title">基本信息</h5>
              <ul className="detail-info">
                <li>
                  <p>
                    <span className="w62">发布时间:</span>
                    <span className="w200">{ data.createTime }</span>
                  </p>
                  <p>
                    <span className="w62">通讯方式:</span>
                    <span className="w200">13566147822</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span className="w62">硬件品牌:</span>
                    <span className="w200">{ data.hardwareBrand }</span>
                  </p>
                  <p>
                    <span className="w62">操作系统:</span>
                    <span className="w200">安卓</span>
                  </p>
                </li>
                <li>
                  <p>
                    <span className="w62">硬件型号:</span>
                    <span className="w200">{ data.hardwareMode }</span>
                  </p>
                  <p>
                    <span className="w62">硬件平台:</span>
                    <span className="w200">蓝海</span>
                  </p>
                </li>
              </ul>
              <p className="detail-info-text1">功能描述:</p>
              <p className="detail-info-text2">空间大结局,撒电力建设劳,动竞赛路径路径空间大结局,撒电力建设劳,动竞赛路径路径撒电力建设劳,动竞赛路径路径撒电力建设劳,动竞赛路径路径撒电力建设劳,动竞赛路径路径</p>
              <div className="line"></div>  
              <h5 className="detail-title">商品介绍</h5>
              <img className="detail-introduce-img" src="" />
              <h5 className="detail-title">商品使用说明</h5>
              <img className="detail-introduce-img" src="" />
            </div>
            
            <div className="detail-table-content">
              <h5 className="detail-title">规格参数</h5>
              <img className="detail-introduce-img" src="" />
            </div>
            
            <div className="detail-table-content">
              <h5 className="detail-title-evaluate">商品评价</h5>
              <div className="detail-evaluate">
                <dl>
                  <dt>好评度</dt>
                  <dd>92%</dd>
                </dl>
                <ul>
                  <li>配置不错</li>
                  <li>外形好看</li>
                  <li>速度快</li>
                  <li>配置不错</li>
                  <li>外形好看</li>
                  <li>速度快</li>
                  <li>配置不错</li>
                  <li>外形好看</li>
                  <li>速度快</li>
                </ul>
              </div>
              <ul className="detail-evaluate-nav">
                <li>
                  <div className="row-radio">
                    <input type="radio" name="radio" value="" />
                    <span>
                      <i className="iconfont icon-radio1"></i>
                      <i className="iconfont icon-radio2"></i>
                    </span>
                  </div>
                  <label>全部评价180</label>
                </li>
                <li>
                  <div className="row-radio">
                    <input type="radio" name="radio" value="" />
                    <span>
                      <i className="iconfont icon-radio1"></i>
                      <i className="iconfont icon-radio2"></i>
                    </span>
                  </div>
                  <label>好评:110</label>
                </li>
                <li>
                  <div className="row-radio">
                    <input type="radio" name="radio" value="" />
                    <span>
                      <i className="iconfont icon-radio1"></i>
                      <i className="iconfont icon-radio2"></i>
                    </span>
                  </div>
                  <label>中评:60</label>
                </li>
                <li>
                  <div className="row-radio">
                    <input type="radio" name="radio" value="" />
                    <span>
                      <i className="iconfont icon-radio1"></i>
                      <i className="iconfont icon-radio2"></i>
                    </span>
                  </div>
                  <label>差评:10</label>
                </li>
              </ul>
              <div className="detail-evaluate-box">
                <div className="detail-evaluate-contaier">
                  <dl className="detail-evaluate-user">
                    <dt><img src="" /></dt>
                    <dd className="detail-evaluate-name">用户名</dd>
                    <dd className="detail-evaluate-star">
                      <i className="iconfont icon-star"></i>
                      <i className="iconfont icon-star"></i>
                      <i className="iconfont icon-star"></i>
                      <i className="iconfont icon-uncollected"></i>
                      <i className="iconfont icon-uncollected"></i>
                    </dd>
                  </dl>
                  <dl className="detail-evaluate-text">
                    <dt>商品性价比不错，物有所值。特别是卖家的服务态度没的说，解决问题利索。以后还会再来买东西的！</dt>
                    <dd>2017年03月03日 13:07</dd>
                  </dl>
                </div>
              </div>
              
            </div>
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