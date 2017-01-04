import React from 'react'
import { Link } from 'react-router'
import '../../styles/_base.scss'
import '../../styles/iconfont/iconfont.css'
import './Sidebar.scss'

class Sidebar extends React.Component {
  render() {
    const { activeTag, onTagChange} = this.props
    const tags = this.props.tags || []
    const urls = this.props.urls || {create: {}, list: {}, doc: {}}
    const type = this.props.type || "应用"
    return (
      <div className='sidebar'>
        <Link className="create-btn" to={urls.create.url}><i className="iconfont icon-create"></i>{'发布新'+type}</Link>
        <ul className="help-menu">
          <li><Link to={urls.list.url} className={(urls.list.active && 'active') || ''}><i className="iconfont icon-application"></i>{'我的'+ type }</Link></li>
          <li><Link to={urls.doc.url} className={(urls.doc.active && 'active') || ''}><i className="iconfont icon-file"></i>开发者文档</Link></li>
        </ul>
        <ul className="tag-list">
          { tags.map( ( item, index ) => {
            return <li key={ item.tagId } onClick={()=> { onTagChange && onTagChange(item.tagId)}}>
              <a className={ ( ( activeTag == item.tagId ) && 'active' ) || '' }>
                <i className={ `iconfont icon-sidebar${ item.tagId }` }></i>{ item.tagName }
              </a>
            </li>
          } ) }
        </ul>
      </div>
    )
  }
}

export default Sidebar