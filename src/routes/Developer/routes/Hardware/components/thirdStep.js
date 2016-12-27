
import React from 'react'

class HardwareThirdPage extends React.Component {
  render(){
    return(
      <div className="step_finish">
        <i></i>
        <span>提交成功，等待审核</span>
        <div className="btn_submit btn_submit_two">
        	<a href="/developer/hardware/list">
        		<button>完成</button>
        	</a>
        </div>
      </div>
    )
  }
}

export default HardwareThirdPage

