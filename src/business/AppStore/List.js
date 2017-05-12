import React from 'react'
import { Link } from 'react-router'
import s from './List-new.scss'

class ListPanel extends React.Component {

  getDataTpl (downloadCount, likeCount) {
    const { type } = this.props
    if (type == 'hardware') {
      return <div className={s.data}>
        <span className={s.number}><i className='iconfont icon-sold' />已售251</span>
        <span className={s.number}><i className='iconfont icon-hands' />好评率100%</span>
      </div>
    }
    return <div className={s.data}>
      <span className={s.number}><i className='iconfont icon-team' /> {downloadCount}</span>
      <span className={s.number}><i className='iconfont icon-star' /> {likeCount}</span>
    </div>
  }

  getItem (item) {
    const {
      appId,
      appName,
      appLogo,
      appDesc,
      developerName,
      defaultLayout,
      price,
      downloadCount,
      likeCount
    } = item

    const { type = 'apps' } = this.props
    const linkTo = `/${type}/detail/${appId}`

    return (
      <li className={s.appItem}>
        <Link to={linkTo}>
          <h4 className={s.title}>{appName}</h4>
          <small className={s.small}>
            <i className={s.uImg} />{developerName}
          </small>
          <img className={s.img} src={appLogo} alt='LOGO' />
          <div className={s.desc}>{appDesc}</div>
          <div className={s.price}>{price ? price + '元' : '免费'}</div>
          { this.getDataTpl(downloadCount, likeCount) }
        </Link>
      </li>
    )
  }

  render () {
    const { data = [] } = this.props

    return (
      <ul className={s.appsList}>
        {data.length ? data.map(item => this.getItem(item)) : '暂无数据'}
      </ul>
    )
  }
}

export default ListPanel
