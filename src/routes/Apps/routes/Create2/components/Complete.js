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
      
      <div className={s['complete-wrapper']}>
        <div className={s.success}>
          <span className={s.img}></span>
          成功创建应用
        </div>
        
        <div className={s.check}>
          <h2 className={s.title}>请查收您的DeveloperKey和DeveloperSecrect：</h2>
          <div className={s.content}>
            <img src="http://img1.ffan.com/T1Fh_TB7DQ1RCvBVdK" alt=""/>
            <div className={s.show}>
              <span className={s.text}>DeveloperKey：199880</span>
              <span className={s.text}>DeveloperSecrect：87908xdfsousoduf8sfasf08ufd</span>
            </div>
          </div>
        </div>
        
        <dl className={s.text}>
          <dt>接下来你要做什么？</dt>
          <dd>1、你可以通过查看开发者文档，进行开发、调试，并将新版本准备好。(注：开发、调试时，需要上面的AppID和AppKEY)</dd>
          <dd>2、新版本准备好之后，你可以在我的应用中发布新版本。</dd>
        </dl>
        <span className={s.text}>返回我的应用，发布新版本。</span>
        
        <button className={`primaryBtn ${s.apply}`}>查看我的应用</button>
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