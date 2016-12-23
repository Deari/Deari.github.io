import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, warn } from '../modules/validate'
import renderField, { renderTextArea } from '../components/renderField'

import WizardFormFirstPage from './firstStep'
import WizardFormSecondPage from './secondStep'
import WizardFormThirdPage from './thirdstep'

const Step = (props)=>(
  <div>{props.children}</div>
)


class ContactForm extends Component {
  state={
    page: 1,
    appLogo:'',
    appTages:[],
    appId:0,
    fileObj:{}
  }
  onStep = ()=>{
    console.log(this.state.page);
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
    console.log(values);
    console.log("click save");
    const tageList = this.state.appTages
    var data = new FormData();
    data.append("appName", values.appName);
    data.append("appLogo", this.state.appLogo);
    data.append("appDesc", values.appDesc);
    data.append("categoryId", values.categoryId);
    data.append("platform", 2);
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
      const id = resp.data.app.appId;
      this.setState({ appId: id },this.nextPage());
    }catch(e){
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
        <Step>{this.state.page}</Step>
        {page === 1 && <WizardFormFirstPage onSubmit={this.firstPageSubmit} getParams={::this.onGetParams} getImgSrc={::this.getImgUrl}/>}
        {page === 2 && <WizardFormSecondPage previousPage={this.previousPage} onSubmit={this.secondPageSubmit} getParams={::this.fileSelected}/>}
        {page === 3 && <WizardFormThirdPage/>}
      </div>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default ContactForm;

