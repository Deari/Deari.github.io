import React from 'react'
import { IndexLink, Link } from 'react-router'
import '../../styles/_base.scss'
import '../../styles/iconfont/iconfont.css'
import './Sidebar.scss'
import fetchUtil from '../../routes/utils/fetchUtil'
import { getDomain } from '../../routes/utils/domain'

class Sidebar extends React.Component {
  state = {
    tags: [{
      tagId: 0, 
      tagName: "全部"
    }],
    currentIndex: 0,
  }
  async componentDidMount() {
    const ruleName = this.getRule()
    const { tags } = this.state
    try {
      const apiUrl = getDomain(
        `http://api.intra.`,
        `ffan.net/bo/v1/public/common/tags?type=${ruleName}`
      )
      const res = await fetchUtil.getJSON(apiUrl)
      if ( res.status === 200 && res.data ) {
        let newTags = tags.concat(res.data)
        this.setState({ tags: newTags })
      } else {
        res.msg && window.alert(res.msg)
      }
    } catch (e) {
      console.log(e)
    }
  }
  getRule() {
    const tagRules = [
      {
        ruleReg: new RegExp('\/apps\/?'),
        ruleName: 'apps'
      },
      {
        ruleReg: new RegExp('\/widgets\/?'),
        ruleName: 'widgets'
      },
      {
        ruleReg: new RegExp('\/hardwares\/?'),
        ruleName: 'hardwares'
      },
    ]
    const path = location.pathname
    for ( let i=0; i<tagRules.length; i++ ) {
      if ( path.search(tagRules[i].ruleReg) != -1 ) return tagRules[i].ruleName
    }
  }
  // 切换标签
  changeTag(item, index, e) {
    e.stopPropagation()
    this.setState({ currentIndex: index })
    this.props.onTagChange(item.tagId)
  }
  render() {
    const { tags, currentIndex } = this.state
    const ruleName = this.getRule()
    return (
      <div className='sidebar'>
        <Link className="create-btn" to={ `/developer/${ruleName}/create` }><i className="iconfont icon-create"></i>创建新组件</Link>
        <ul className="help-menu">
          <li><Link to={ `/developer/${ruleName}/list` }><i className="iconfont icon-application"></i>我的应用</Link></li>
          <li><Link to={ `/developer/${ruleName}` }><i className="iconfont icon-file"></i>应用文档</Link></li>
        </ul>
        <ul className="tag-list">
        {
          tags.map(( item, index ) => {
            return <li key={ item.tagId } onClick={ this.changeTag.bind(this, item, index) }>
              <a className={ currentIndex === index ? 'active' : '' }>
                <i className={`iconfont icon-sidebar${ item.tagId }`}></i>{ item.tagName }
              </a>
            </li>
          })
        }
        </ul>
      </div>
    )
  }
}

export default Sidebar
