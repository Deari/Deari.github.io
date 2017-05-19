import React from 'react'
import t from 'business/AppCreate/Basic-new.scss'
import s from './Alert-new.scss'

const Alert = () => {
	return(
		<div className={s['alert-wrapper']}>
				<div className={s.content}>
					<div className={s.title}>
						<h2 className={s.name}>选择组件</h2>
						<span className={s.close}>关闭</span>
					</div>
					<div className={s.search}>
						<input type="text" placeholder="请输入组件名称进行搜索" className={s['input-search']}/>
						<i className="iconfont icon-search"></i>
					</div>
					<div className={s['alert-table']}>
						<div className={s['table-thead']}>
							<table className={`site-table ${s['tableWrapper']}`} cellSpacing='0' cellPadding='0'>
								<thead>
				          <tr>
				            <th>Logo</th>
				            <th>应用名称</th>
				            <th>价格</th>
				            <th>状态</th>
				            <th>操作</th>
				          </tr>
				        </thead>
							</table>
						</div>
						<div className={s['table-tbody']}>
							<table className={`site-table ${s['tableWrapper']}`} cellSpacing='0' cellPadding='0'>
								<tbody>
				        	<tr>
						        <td className={s.imgWrap}><img src="http://temp.im/90x90" alt='LOGO' /></td>
						        <td className={s.appInfo}>
						          <span className={s.name}>h5组件数据测试516-01</span>
						          <i className='iconfont icon-hpng'/>
						          <span className={s.desc}>预览图用于商家在装修自己店面时，在操作区域展示的图片大小不超过300KB</span>
						          <a className={s.link}>在组件市场中查看<i className="iconfont icon-look"></i></a>
						        </td>
						
						        <td className={s.price}>
						          <span className={s.name}>免费</span>
						        </td>
						        <td className={s.status}>
						          <div className={s.vStatus}>
						            <span className={s.version}><i className={s.round}></i>1.0.0</span>
						            <span className={s.text}>准备提交</span>
						          </div>
						        </td>
						
						        <td className={s.actions}>
						          <a  className={`defaultBtn ${s.tableBtn}`}>选择</a>
						        </td>
						      </tr>
				        </tbody>
							</table>
						</div>
					</div>
				</div>
		</div>
	)
}

export default Alert;
