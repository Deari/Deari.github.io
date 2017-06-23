import React from 'react'
import { Link } from 'react-router'
import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/d'
import debug from 'utils/debug'
import moment from 'moment'
import SideBar from 'business/SideBar'
import { PageTypes, getPageLinks, HardwareLinks } from 'config/index'

import './index.scss'
import CommentTpl from './Comment.js'
import ParamTpl from './Param.js'
import ProductDescTpl from './ProductDesc.js'

import commentData from './data.js'

class HardwareDetail extends React.Component {
  constructor () {
    super()
    this.state = {
      data: [],
      tags:[],
      active:'productDesc'
    }
  }

  async getInfo (e) {
    let id = this.props.params.id
    let apiUrl = getDomain(`/app/v1/bo/v1/web/hardware/getHardwareInfo/${id}`)
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res && res.status === 200) {
        const obj = {
          ...res.data,
          hardwareName:res.data.verboseName,
          hardwareProducer:res.data.brand,
          hardwareLogo:res.data.image,
          hardwareFunction:res.data.productDesc,
          hardwareTags:res.data.tagList,
          createTime:res.data.createdAt
        }
        res.data && this.formatData(obj)
      } else {
        debug.warn('获取详情接口返回错误')
      }
    } catch (e) {
      console.log('获取详情接口返回错误', e)
    }
  }

  async getTags (e) {
    let apiUrl = getDomain(`/app/v1/bo/v1/public/common/tags?type=hardware`)
    try {
      let res = await fetchUtil.getJSON(apiUrl)
      if (res.status === 200) {
        res.data && this.setState({ tags: res.data })
      } else {
        debug.warn('获取标签接口返回错误')
      }
    } catch (e) {
      console.log('获取标签接口返回错误', e)
    }
  }

  formatData (data) {
    data.createTime = data.createTime && moment(data.createTime * 1000).format('YYYY-MM-DD H:m:s')
    this.setState({ data: data })
  }

  async componentDidMount () {
    window.scrollTo(0, 0)
    await this.getInfo()
    await this.getTags()
    let { tags } = this.state
    tags.unshift({ tagId: 0, tagName: '全部标签' })
    tags.map((item, index) => {
      item.aHref = (index == 0) ? `/hardware` : `/hardware?tagId=${item.tagId}`
    })
    this.setState({ tags: tags })
  }
  handleTabChange (type) {
    this.setState({ active:type })
  }
  render () {
    let { data, tags, active } = this.state
    const infoTags = data.hardwareTags || []
    const len = infoTags.length

    const navList = [{ value:'商品介绍', type:'productDesc' }, { value:'规格参数', type:'typeParam' }, { value:'评论(' + commentData.assessList[0].list.length + ')', type:'comment' }]
    
    const pageLinks = [{
      link: <a href={`${HardwareLinks.list}`}><i className={`iconfont icon-application`} />我的硬件</a>
    },{
      link: <a href={`${HardwareLinks.doc}`}><i className={`iconfont icon-file`} />开发者文档</a>
    }]

    return (
      <div className='container'>
        <SideBar pageLinks={pageLinks} type="hardware"/>
        <div className='content'>
          <div className='detail-container'>
            <div className='detail-returnnav'>
              <p onClick={() => { window.history.go(-1) }}>返回</p>
            </div>
            <div className='detail-hardwareimg'>
              <img className='appImg' src={data.hardwareLogo} alt='LOGO' />
              <a className='detail-start'><i className='iconfont icon-uncollected icon-uncollected2' /><span>收藏</span></a>
            </div>
            <div className='detail-hardwareinfo'>
              <dl className='detail-tittle1'>
                <dt>{ data.hardwareName }</dt>
                <dd><i className='user-img' /><span className='user-txt'>{ data.hardwareProducer }</span></dd>
              </dl>
              <h5 className='detail-title'><i className='detail-title-dot' />硬件介绍:</h5>
              <p className='detail-introduce'>{ data.hardwareFunction }</p>
              <h5 className='detail-title'><i className='detail-title-dot' />类别:
                <span className='detail-genre'>
                  <i className='tag'>{data.type}</i>
                </span>
              </h5>
              <h5 className='detail-title'><i className='detail-title-dot' />标签:
                <span className='detail-label'>
                  {infoTags.map((item) => (<i>{item}{ len === 0 ? `、` : '' }</i>))}
                </span>
              </h5>
              <h5 className='detail-title'><i className='detail-title-dot' />已售:
                <span className='detail-sold'>180件</span>
              </h5>
              <h5 className='detail-title'><i className='detail-title-dot' />价格:
                <span className='detail-price'>{data.price}<i>元</i></span>
              </h5>
            </div>
          </div>
          <div className='detail-table-box'>
            <ul className='detail-table-nav'>
              {
               navList.map((v, k) => (
                 <li key={k}>
                   <span className={v.type === active ? 'active' : ''} onClick={this.handleTabChange.bind(this, v.type)}>{v.value}</span>
                 </li>
               ))
             }
            </ul>
            {
              active === 'productDesc' ?
                <ProductDescTpl data={data} />
              :
              active === 'typeParam' ?
                <ParamTpl uploadProductSpecification={data.uploadProductSpecification} />
              :
                <CommentTpl {...commentData} />
            }
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
