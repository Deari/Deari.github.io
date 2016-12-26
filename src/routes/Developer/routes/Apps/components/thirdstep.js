import React from 'react'
import './thirdstep.scss'

class WizardFormFirstPage extends React.Component {
  
  render(){
    return(
      <div className="step_finish">
        <div className="step_finish_text">
        	<i className="iconfont icon-finish step_finish_i"></i>
        	<span>提交成功，等待审核</span>
        </div>
        <div className="step_form_btn">
        	<a href="/developer/apps">
        		<button>完成</button>
        	</a>
        </div>
      </div>
     
    )
  }
}

export default WizardFormFirstPage