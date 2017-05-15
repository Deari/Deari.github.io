import React from 'react'
import s from './H5-new.scss'

class Main extends React.Component {
  render () {
    return <div className={s['main-container']}>
      <h2 className={s['current-location']}>
        <a className="iconfont icon-fanhui" href="/apps/list"></a>
        <span className={s.site}>我的应用</span>
        创建新应用 ( H5 类型 )
      </h2>
      <ul className={s['tabs-item']}>
        <li className={`${s.tabs} ${s['tabs-border']}`}>基本信息</li>
      </ul>
      <div className={`${s['tabs-content']} ${s['tabs-status']}`}>
      	<span className={s['basic-info']}>
      		<i className="iconfont icon-zhuyi"></i>
      		您的这次更新会在新的 应用 版本发布后，在 应用市场 上显示。
      	</span>
        <form className={s['site-form']}>
          <div className={s['form-group']}>
            <label className={s['control-label']}>应用名称</label>
            <div className={s['form-item']}>
              <div className={s['item-control']}>
                <div className={s['item-iconfont']}>
                  <i className="iconfont icon-edit"></i>
                  <input type="text" className={s['form-control']}/>
                  <i className="iconfont icon-edit"></i>
                </div>
                <div className={s['form-info']}>
                  <i className="iconfont icon-miashu"></i>
                  <p className={s['info-content']}>您的 应用 在 应用市场 中显示的名称</p>
                </div>
              </div>
              <span className={s['has-error']}>请输入内容</span>
            </div>
          </div>
          <div className={s['form-group']}>
            <label className={s['control-label']}>应用图片</label>
            <div className={s['form-item']}>
              <div className={`${s['item-control']} ${s['item-upload']}`}>
                <div className={s['item-rule']}>
                  <span className={s['rule-text']}>请上传应用高清图片<br/>400*400像素，仅支持PNG格式，大小不超过300KB</span>
                  <div className={s['form-info']}>
                    <i className="iconfont icon-miashu"></i>
                    <p className={s['info-content']}>此图标将用于 应用市场，最低分辨率至少为 72 DPI，并采用 RGB 色彩空间。它不能包含图层或圆角。</p>
                  </div>
                </div>
                <span className={s['upload-btn']}>
                  <input type="file" className={s['upload-file']}/>
                  <div className={s.text}>选择文件</div>
                </span>
              </div>
              <div className={s['has-error']}>请输入内容</div>
              <ul className={`${s['img-item']} ${s.active}`}>
                <li className={s['upload-img']}>
                  <img src=""/>
                </li>
              </ul>
            </div>
          </div>
          <div className={s['form-group']}>
            <label className={s['control-label']}>应用简介</label>
            <div className={s['form-item']}>
              <div className={`${s['item-control']} ${s['item-summary']}`}>
                <textarea className={s['item-textarea']}></textarea>
                <div className={s['form-info']}>
                  <i className="iconfont icon-miashu"></i>
                  <p className={s['info-content']}>对您的 应用 的描述，用以详细说明特性和功能</p>
                </div>
              </div>
              <div className={s['has-error']}>请输入内容</div>
            </div>
          </div>
          <div className={s['form-group']}>
            <label className={s['control-label']}>标签</label>
            <div className={s['form-item']}>
              <div className={`${s['item-control']} ${s['item-summary']}`}>
                <ul className={s['item-tag']}>
                  <li className={`${s.tags} ${s['btn-default']}`}>营销常用</li>
                  <li className={`${s.tags} ${s['btn-default']}`}>营销常用</li>
                  <li className={`${s.tags} ${s['btn-default']}`}>营销常用</li>
                  <li className={`${s.tags} ${s['btn-default']}`}>营销常用</li>
                  <li className={`${s.tags} ${s['btn-default']}`}>营销常用</li>
                  <li className={`${s.tags} ${s['btn-default']}`}>营销常用</li>
                  <li className={`${s.tags} ${s['btn-default']}`}>营销常用</li>
                </ul>
                <div className={s['form-info']}>
                  <i className="iconfont icon-miashu"></i>
                  <p className={s['info-content']}>一个或多个标签，用以描述您的应用</p>
                </div>
              </div>
              <div className={s['has-error']}>请输入内容</div>
            </div>
          </div>
          <div className={s['form-btn']}>
            <button className={s['btn-primary']}>保存</button>
          </div>
        </form>
      </div>
    </div>
  }
}

export default Main;