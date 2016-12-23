import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, warn } from '../modules/validate'
import renderField, { renderTextArea } from '../components/renderField'
import './create.scss'

import WizardFormFirstPage from './firstStep'
import WizardFormSecondPage from './secondStep'
import WizardFormThirdPage from './thirdstep'

const Step = (props)=>(
  <div className="step">
  	<h2>发布新应用</h2>
  	<div className='branchBox'>
	    <div className={props.page == 1? 'branch active':'branch'}>
	    	<span>1</span>
	    	<span>填写基本信息</span>
	    </div>
	    <div className="branchBox_line"></div>
	    <div className={props.page == 2? 'branch active':'branch'}>
	    	<span>2</span>
	    	<span>填写版本信息</span>
	    </div>
	    <div className="branchBox_line"></div>
	    <div className={props.page == 3? 'branch active':'branch'}>
	    	<span>3</span>
	    	<span>提交成功</span>
	    </div>
  	</div>
  </div>
)


class ContactForm extends Component {
  state={
    page: 1,
    appLogo:'',
    appTages:[],
    appId:0,
    fileObj:{}
  }
  nextPage = ()=> {
    this.setState({page: this.state.page + 1});
  }
  previousPage = ()=>{
    this.setState({page: this.state.page - 1})
  }


  getImgUrl(imgUrl){
    this.setState({appLogo:imgUrl})
  }
  onGetParams(tags){
    this.setState({appTages:tags})
  } 
  firstPageSubmit = async (values) => {
    // Do something with the form values
    //console.log(values);
    //console.log("click save");
    const tageList = this.state.appTages
    let data = new FormData();
    const dataList = {
      appName:values.appName,
      appLogo:this.state.appLogo,
      appDesc:values.appDesc,
      categoryId:values.categoryId,
      platform:2
    }
    for(var key in dataList){
      if(dataList[key]){
        data.append(key, dataList[key])
      }
    }
    for (var i = 0; i < tageList.length; i++) {
      data.append("tags[]", tageList[i]);
    }
    const url = 'http://api.intra.sit.ffan.net/bo/v1/web/developer/app'
    
    try{
      const res = await fetch(url, {
          method: "POST",
          body: data
      });
      const resp = await res.json();
      if (resp.status == 200) {
        const id = resp.data.app.appId;
        this.setState({ appId: id }, this.nextPage());
      }else{
        alert("服务端验证不通过，请进一步核对信息")
      }
    }catch(e){
      alert(e.msg)
      console.log(e)
    }
  }
    

  fileSelected(fileObj){
    this.setState({fileObj:fileObj})
  }
  secondPageSubmit = (values) => {
    // Do something with the form values
    const verUrl = `http://api.intra.sit.ffan.net/bo/v1/web/developer/app/${this.state.appId}/code`
    var verData = new FormData();
    const fileObj = this.state.fileObj
    const fileList = {
      fileName: fileObj.originalName,
      fileLink: fileObj.url,
      moduleName: fileObj.moduleName,
      setting: fileObj.setting,
      rnFrameworkVersion: fileObj.rnFrameworkVersion,
      platform: fileObj.platform
    }
    for(var key in fileList){
      if(fileList[key]){
        verData.append(key, fileList[key])
      }
    }
    verData.append("codeDesc", values.codeDesc)
    fetch(verUrl, {
      method: "POST",
      body: verData
    })
    this.nextPage()
  }

  render() {
    const { page } = this.state;
    return (
      <div>
        <Step page={page}/>
        {
          page === 1 && <WizardFormFirstPage 
                          onSubmit={this.firstPageSubmit} 
                          getParams={::this.onGetParams} 
                          getImgSrc={::this.getImgUrl}
                          />
        }
        {
          page === 2 && <WizardFormSecondPage 
                          previousPage={this.previousPage} 
                          onSubmit={this.secondPageSubmit} 
                          getParams={::this.fileSelected}
                          />
        }
        {
          page === 3 && <WizardFormThirdPage/>
        }
      </div>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default ContactForm;

