import React from 'react'
import { Link } from 'react-router'
import LoginSDK from 'utils/loginSDK'
import { getApiDomain, getLoginDomain, getSourceVal } from 'utils/domain'
import 'styles/_base.scss'
import './Sidebar.scss'

class Sidebar extends React.Component {

  clickBtn(href) {
    let sourceVal = getSourceVal()
    let url = getLoginDomain(`passport/session-check.json`)
    let loginUrl = getApiDomain(`#!/login?source=${sourceVal}`)
    let callbackUrl = `${location.origin}${href}`
    
    LoginSDK.getStatus((status, data) => {
      if (status) window.location.href = href
    }, url, loginUrl, callbackUrl)
  }

  render() {

    const { bottomComponent } = this.props

    const renderBottomComponent = bottomComponent && bottomComponent(this.props)

    const urls = this.props.urls || { create: {}, list: {}, doc: {} }

    return (
      <div className='sidebar'>

        <a className="create-btn" onClick={this.clickBtn.bind(this, urls.create.url)}>
          <i className="iconfont icon-create"></i>{urls.create.name ? urls.create.name : '创建'}
        </a>

        <ul className="help-menu">
          <li>
            <a className={(urls.list.active && 'active') || ''} onClick={this.clickBtn.bind(this, urls.list.url)}>
              {this.props.typeName?'':<i className="iconfont icon-application"></i>}{urls.list.name ? urls.list.name : '我的列表'}
            </a>
          </li>
          <li>
            <Link to={urls.doc.url} className={(urls.doc.active && 'active') || ''}> 
              {this.props.typeName?'':<i className="iconfont icon-file"></i>}开发者文档
            </Link>
          </li>
        </ul>

        {renderBottomComponent}

      </div>
    )
  }
}

export const RenderTags = (props) => (
  <ul className="tag-list">
    { props.tags && props.tags.map( ( item, index ) => {
      return <li key={ item.tagId }>
        <Link className={ item.className } 
              to={ item.aHref } 
              onClick={()=> { props.onTagChange && props.onTagChange(item.tagId) }}>
         {props.typeName?'':<i className={ `iconfont icon-sidebar${ item.tagId }` }></i>} { item.tagName }
        </Link>
      </li>
    } ) }
  </ul>
)

export default Sidebar