import React from 'react'
import { Link } from 'react-router'
import s from './Complete-new.scss'
import cx from 'classnames'
import BreadCrumb from 'business/AppCreate/BreadCrumb'
import { getAppInfo } from 'reducers/api'

class Complete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  componentWillMount() {
    getAppInfo({
      appId: this.props.params.id
    }).then(data=>{
      this.setState({ data })
    }).catch(e=>{
      alert(`拉取数据失败(错误码：${e.status})`)
    })
  }

  handleView () {
    this.props.router.replace(`/apps/detail/${this.state.data.appId}`)
  }

  render() {
    const { data } = this.state;
    return (
      <div className={s.wrapper}>
        <BreadCrumb></BreadCrumb>
        <div className={`${s['success-wrapper']} ${s['complete-wrapper']}`}>
          <div className={s.success}>
            <span className={s.img}></span>
            成功创建应用
          </div>
          
          <div className={s.content}>
              <img src={data.appLogo} alt=""/>
              <div className={s.list}>
                <h2 className={s.item}>{data.appName}</h2>
                <span className={s.item}>AppID: <span className={s.number}>{data.appId}</span></span>
                <span className={s.item}>DeveloperKey：<span className={s.number}>{data.appName}</span></span>
                <span className={s.item}>DeveloperSecrect：<span className={s.number}>{data.appName}</span></span>
              </div>
          </div>
          
          <dl className={s['success-text']}>
            <dt>接下来你要做什么？</dt>
            <dd>1、你可以通过查看开发者文档，进行开发、调试，并将新版本准备好。(注：开发、调试时，需要上面的AppID和AppKEY)</dd>
            <dd>2、新版本准备好之后，你可以在我的应用中发布新版本。</dd>
          </dl>
          <span className={s['success-text']}>返回我的应用，发布新版本。</span>
          <button onClick={::this.handleView} className={`primaryBtn ${s['return-apply']}`}>查看我的应用</button>
        </div>
        
        <ul className={s['doc-wrapper']}>
          <li className={s.item}>
            <span className={s.img}></span>
            <div className={s.link}>
              <h2 className={s.title}>开发者必读</h2>
              <Link to='/apps/doc#开始前必读' className={s.address}>点击进入</Link>
            </div>
          </li>
          <li className={s.item}>
            <span className={s.img}></span>
            <div className={s.link}>
              <h2 className={s.title}>iOS开发者文档</h2>
              <Link to='/apps/doc#iOS开发者' className={s.address}>点击进入</Link>
            </div>
          </li>
          <li className={s.item}>
            <span className={s.img}></span>
            <div className={s.link}>
              <h2 className={s.title}>Android开发者文档</h2>
              <Link to='/apps/doc#Android开发者' className={s.address}>点击进入</Link>
            </div>
          </li>
          <li className={s.item}>
            <span className={s.img}></span>
            <div className={s.link}>
              <h2 className={s.title}>HTML5开发者文档</h2>
              <Link to='/apps/doc#HTML5开发者' className={s.address}>点击进入</Link>
            </div>
          </li>
        </ul>
        
      </div>
    )
  }
}

export default Complete;