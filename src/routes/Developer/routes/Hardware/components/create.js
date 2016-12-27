import React, { Component, PropTypes } from 'react'
import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from '../../../../utils/domain'

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
    step: 1,
    hardwareTags: [],
    hardwareLogo: null,
    majorCategoryId: null,
  }
  async firstPageSubmit(values) {
    let firstStepValues = {};
    let { hardwareTags } = this.state;
    let postParams = new FormData();
    Object.assign(firstStepValues, this.state, values);
    for(var key in firstStepValues){
      if(firstStepValues[key]){
        postParams.append(key, firstStepValues[key])
      }
    }
    for (var i = 0; i < hardwareTags.length; i++) {
      postParams.append("hardwareTags[]", hardwareTags[i]);
    }
    const apiUrl = getDomain(
      "http://api.intra.",
      "ffan.net/bo/v1/web/hardware/addHardware/step1"
    );
    try {
      const res = await fetchUtil.postJSON(apiUrl, postParams, { "type": "formData" });
      console.log("res ", res)
      if (res.status === 200) {
        this.nextPage();
      } else {
        res.msg && window.alert(res.msg);
      }
    } catch (e) {
      console.log(e);
    }
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
  tagChange(tags) {
    tags && this.setState({ hardwareTags: tags })
  }
  selectLogo(imgUrl) {
    imgUrl && this.setState({ hardwareLogo: imgUrl })
  }
  changeCategory(categoryId) {
    categoryId && this.setState({ majorCategoryId: categoryId })
  }
  render() {
    const { step } = this.state
    return (
      <div>
        <Step step={step} />
        {step === 1 && <HardwareFirstPage 
                          onSubmit={this.firstPageSubmit.bind(this)}
                          onTagChange={this.tagChange.bind(this)}
                          onSelectLogo={this.selectLogo.bind(this)}
                          onChangeCategory={this.changeCategory.bind(this)} />}
        {step === 2 && <HardwareSecondPage onClickPrev={this.prevPage.bind(this)} onSubmit={this.secondPageSubmit.bind(this)} />}
        {step === 3 && <HardwareThirdPage onClickPrev={this.prevPage.bind(this)} />}
        {JSON.stringify(this.state.values)}
      </div>
    )
  }
}

HardwareForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default HardwareForm;