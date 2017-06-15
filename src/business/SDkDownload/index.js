import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'

const SDKDownload = () => {
	return(
		<div className={`tabs ${s.SDkDownload}`}>
				<ul className={`tabs-titles ${s.tabFilters}`}>
					<li className={`tabs-item ${s.tabsStatus} ${s.active}`}>Android</li>
					<li className={`tabs-item ${s.tabsStatus}`}>ios</li>
				</ul>
				<div className={s.content}>
					<div className={s.download}>
						<h2 className={s.title}>1、示例工程下载</h2>
						<a href="#" className={`btn-primary ${s.action}`}>点击下载</a>
					</div>
					<div className={s.download}>
						<h2 className={s.title}>2、SDK下载(请先选择SDK需要<span>xxxx</span>)</h2>
						<ul className={s.list}>
							<li className={s.item}>
								<img src="http://timg.ffan.com/convert/resize/url_T1jBhTBvCb1RCvBVdK/tfs/1.png" className={s.typeImg}/>
								<div className="checkbox-item">
									<i className={cx("iconfont", 'icon-radio1')}></i>
									<span className={s.name}>FAP小程序</span>
								</div>
							</li>
							<li className={s.item}>
								<img src="http://timg.ffan.com/convert/resize/url_T1uBDTBsC_1RCvBVdK/tfs/1.png" className={s.typeImg}/>
								<div className="checkbox-item">
									<i className={cx("iconfont", 'icon-radio')}></i>
									<span className={s.name}>HTML5</span>
								</div>
							</li>
							<li className={s.item}>
								<img src="http://timg.ffan.com/convert/resize/url_T1.sCTBbZT1RCvBVdK/tfs/1.png" className={s.typeImg}/>
								<div className="checkbox-item">
									<i className={cx("iconfont", 'icon-radio1')}></i>
									<span className={s.name}>APK</span>
								</div>
							</li>
						</ul>
						<span className={`btn-primary ${s.action}`}>点击获取</span>
						<div className={`${s.copyLink} ${s.active}`}>
							<input type="text" className={s.link}/>
							<span className={s.copy}>复制</span>
						</div>
					</div>
				</div>
		</div>
	)
}

export default SDKDownload;
