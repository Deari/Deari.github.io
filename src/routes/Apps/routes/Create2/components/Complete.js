import React from 'react'
import t from './Basic-new.scss'
import s from './Complete-new.scss'
import cx from 'classnames'

const Complete = () => {
  return (
    <div className={s.wrapper}>
      <h2 className={t.breadcrumb}>
        <a className="iconfont icon-fanhui" href="/apps/list"></a>
        <span className={t.site}>我的应用</span>
        <span className={`${t.site} ${t.noNext}`}>创建新应用 ( H5 类型 )</span>
      </h2>
      
      <div className={`${t['success-wrapper']} ${s['complete-wrapper']}`}>
        <div className={t.success}>
          <span className={t.img}></span>
          成功创建应用
        </div>
        
        <div className={s.content}>
            <img src="http://temp.im/110x110" alt=""/>
            <div className={s.list}>
              <h2 className={s.item}>应用关联测试关联测试关联测试</h2>
              <span className={s.item}>AppID: 2009</span>
              <span className={s.item}>DeveloperKey：199880</span>
              <span className={s.item}>DeveloperSecrect：87908xdfsousoduf8sfasf08ufd</span>
            </div>
        </div>
        
        <dl className={t['success-text']}>
          <dt>接下来你要做什么？</dt>
          <dd>1、你可以通过查看开发者文档，进行开发、调试，并将新版本准备好。(注：开发、调试时，需要上面的AppID和AppKEY)</dd>
          <dd>2、新版本准备好之后，你可以在我的应用中发布新版本。</dd>
        </dl>
        <span className={t['success-text']}>返回我的应用，发布新版本。</span>
        
        <button className={`primaryBtn ${t['return-apply']}`}>查看我的应用</button>
      </div>
      
      <ul className={s['doc-wrapper']}>
        <li className={s.item}>
          <span className={s.img}></span>
          <div className={s.link}>
            <h2 className={s.title}>开发者必读</h2>
            <a href="#" className={s.address}>点击进入</a>
          </div>
        </li>
        <li className={s.item}>
          <span className={s.img}></span>
          <div className={s.link}>
            <h2 className={s.title}>iOS开发者文档</h2>
            <a href="#" className={s.address}>点击进入</a>
          </div>
        </li>
        <li className={s.item}>
          <span className={s.img}></span>
          <div className={s.link}>
            <h2 className={s.title}>Android开发者文档</h2>
            <a href="#" className={s.address}>点击进入</a>
          </div>
        </li>
        <li className={s.item}>
          <span className={s.img}></span>
          <div className={s.link}>
            <h2 className={s.title}>HTML5开发者文档</h2>
            <a href="#" className={s.address}>点击进入</a>
          </div>
        </li>
      </ul>
      
    </div>
  )
}


export default Complete;