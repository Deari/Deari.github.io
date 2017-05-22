import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'


const BrowseImg = () => {
    return (
      <div className="form-group">
        <label className="label">预览图</label>
        <div className='form-item'>
          <div className={"item-wrapper"}>
            <span className={s['rule-text']}>预览图用于商家在装修自己店面时，在操作区域展示的图片<br/>大小不超过300KB</span>
            <span className={s['upload-btn']}>
              <input type='file' className={s['upload-file']}  />
              <div className={s.text} >选择文件</div>
            </span>
          </div>
          <div className="form-item-msg error">错误</div>
          <div className={s.show}>
          	<ul className={`${s['img-item']} ${s.active}`}>
	          	<li className={s['upload-img']}>
	          		<img src="http://temp.im/98x98"/>
	          	</li>
	          </ul>
	          <div className={`${s.example} ${s.hide}`}>
							<div className={s.content}>
									<a className={s['example-img']} href="http://nres.ffan.com/newh5/2017426/b712af2abb20f1f88d1b8c46a1612bbdaea1c8b5.psd">
										<span className={s.img}></span>
										<span className={`${s.img} ${s['img-hover']}`}></span>
										<span className={s.name}>下载模板</span>
									</a>
								<div className={s['example-text']}>
									<h3 className={s.title}>图片示例</h3>
									<p className={s.con}>需包含：圆形图标 + 组件名称 点击左侧图片，下载模板文件制作组件图片</p>
								</div>
							</div>
	          </div>
          </div>
          
          
        </div>
      </div>
    )
}

export default BrowseImg;