import './step.scss'
import { Link } from 'react-router'
const Step = (props)=>(
  <div className="step">
  	<p className="step-smallnav"><Link className="iconfont icon-fanhui" to='/apps/list'></Link><span>我的应用</span><span className="step-smallnav-arrow">></span>{props.page == 1?'编辑应用':'发布新版本'} {props.appKindName || ''}</p>
  </div>
)
export default Step
  	// <div className='branchBox'>
	  //   <div className={props.page == 1? 'branch active':'branch'}>
	  //   	<span>1</span>
	  //   	<span>填写基本信息</span>
	  //   </div>
	  //   <div className="branchBox-line"></div>
	  //   <div className={props.page == 2? 'branch active':'branch'}>
	  //   	<span>2</span>
	  //   	<span>填写版本信息</span>
	  //   </div>
	  //   <div className="branchBox-line"></div>
	  //   <div className={props.page == 3? 'branch active':'branch'}>
	  //   	<span>3</span>
	  //   	<span>提交成功</span>
	  //   </div>
  	// </div>