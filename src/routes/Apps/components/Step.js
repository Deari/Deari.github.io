import './step.scss'

const Step = (props)=>(
  <div className="step">
  	<p className="step-smallnav"><i className="iconfont icon-fanhui"></i><span>我的应用</span><span className="step-smallnav-arrow">></span>{props.page == 1?'编辑应用':'发布新版本'} {props.appKindName || ''}</p>
  </div>
)
export default Step
    // <h2 className="step-tittle">{props.page == 3?'版本信息':'基本信息'} </h2>
    // {props.page == 1&&<p className='step-prompt'><i className="iconfont icon-radio2"></i>您的这次更新会在新的应用版本发布后，在应用是市场上显示。</p>}
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