import React from 'react'
import { Link } from 'react-router'
import LoginSDK from 'utils/loginSDK'
import { getApiDomain, getLoginDomain } from 'utils/domain'
import 'styles/_base.scss'
import './Sidebar.scss'

class Sidebar extends React.Component {

  clickBtn(href) {
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login/`)
    let callbackUrl = `${location.host}${href}`
    
    LoginSDK.getStatus((status, data) => {
      if (status) window.location.href = href
    }, url, loginUrl, callbackUrl)
  }

  render() {
    const { onTagChange } = this.props
    const tags = this.props.tags || []
    const urls = this.props.urls || { create: {}, list: {}, doc: {} }
    return (
      <div className='sidebar'>

        <a className="create-btn" onClick={this.clickBtn.bind(this, urls.create.url)}>
          <i className="iconfont icon-create"></i>{urls.create.name ? urls.create.name : '创建'}
        </a>

        <ul className="help-menu">
          <li>
            <a className={(urls.list.active && 'active') || ''} onClick={this.clickBtn.bind(this, urls.list.url)}>
              <i className="iconfont icon-application"></i>{urls.list.name ? urls.list.name : '我的列表'}
            </a>
          </li>
          <li><Link to={urls.doc.url} className={(urls.doc.active && 'active') || ''}><i className="iconfont icon-file"></i>开发者文档</Link></li>
        </ul>
        
        <ul className="tag-list">
          { tags.map( ( item, index ) => {
            return <li key={ item.tagId }>
              <Link className={ item.className } 
                    to={ item.aHref } 
                    onClick={()=> { onTagChange && onTagChange(item.tagId) }}>
                <i className={ `iconfont icon-sidebar${ item.tagId }` }></i>{ item.tagName }
              </Link>
            </li>
          } ) }
        </ul>
      </div>
    )
  }
}

export default Sidebar