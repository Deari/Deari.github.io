import React, { Component, PropTypes } from 'react'
// import '../../Apps/components/create.scss'

import HardwareFirstPage from './firstStep'
import HardwareSecondPage from './secondStep'
import HardwareThirdPage from './thirdStep'

const Step = (props)=>(
  <div className="step">
  	<h2>创建硬件</h2>
  	<div className='branchBox'>
	    <div className={props.step == 1? 'branch active':'branch'}>
	    	<span>1</span>
	    	<span>填写基本信息</span>
	    </div>
	    <div className="branchBox_line"></div>
	    <div className={props.step == 2? 'branch active':'branch'}>
	    	<span>2</span>
	    	<span>填写版本信息</span>
	    </div>
	    <div className="branchBox_line"></div>
	    <div className={props.step == 3? 'branch active':'branch'}>
	    	<span>3</span>
	    	<span>提交成功</span>
	    </div>
  	</div>
  </div>
)

class HardwareForm extends Component {
  state = {
    step: 1
  }
  firstPageSubmit(values) {
    console.log("firstPageSubmit ", values);
    this.nextPage();
  }
  secondPageSubmit(values) {
    console.log("secondPageSubmit ", values);
    this.nextPage();
  }
  nextPage() {
    console.log("nextPage")
    this.setState({ step: this.state.step + 1 })
  }
  prevPage() {
    this.setState({ step: this.state.step - 1 })
  }
  render() {
    const { step } = this.state
    return (
      <div>
        <Step step={step} />
        {step === 1 && <HardwareFirstPage onSubmit={this.firstPageSubmit.bind(this)} />}
        {step === 2 && <HardwareSecondPage onClickPrev={this.prevPage.bind(this)} onSubmit={this.secondPageSubmit.bind(this)} />}
        {step === 3 && <HardwareThirdPage onClickPrev={this.prevPage.bind(this)} />}
      </div>
    )
  }
}

HardwareForm.propTypes = {
  // onSubmit: PropTypes.func.isRequired
}

export default HardwareForm;