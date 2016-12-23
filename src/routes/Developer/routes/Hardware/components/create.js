import React, { Component, PropTypes } from 'react'

import HardwareFirstPage from './firstStep'
import HardwareSecondPage from './secondStep'
// import HardwareThirdPage from './thirdStep'

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
        <ul>
          <li style={{color: step === 1 ? 'red' : ''}}>1</li>
          <li style={{color: step === 2 ? 'red' : ''}}>2</li>
          <li style={{color: step === 3 ? 'red' : ''}}>3</li>
        </ul>
        {step === 1 && <HardwareFirstPage onSubmit={this.firstPageSubmit.bind(this)} />}
        {step === 2 && <HardwareSecondPage onClickPrev={this.prevPage.bind(this)} onSubmit={this.secondPageSubmit.bind(this)} />}
      </div>
    )
  }
}

HardwareForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default HardwareForm;