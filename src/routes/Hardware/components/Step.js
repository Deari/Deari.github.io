import './step.scss'

const Step = (props)=>(
  <div className="step">
  	<h2>{props.title || '创建新硬件'}</h2>
  	<div className='branchBox'>
	    <div className={props.page == 1? 'branch active':'branch'}>
	    	<span>1</span>
	    	<span>填写基本信息</span>
	    </div>
	    <div className="branchBox-line"></div>
	    <div className={props.page == 2? 'branch active':'branch'}>
	    	<span>2</span>
	    	<span>填写平台信息</span>
	    </div>
	    <div className="branchBox-line"></div>
	    <div className={props.page == 3? 'branch active':'branch'}>
	    	<span>3</span>
	    	<span>提交成功</span>
	    </div>
  	</div>
  </div>
)
export default Step