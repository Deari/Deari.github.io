import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

import { validate, warn } from '../modules/validate'

import FirstStep from '../components/FirstStep'
import SecondStep from '../components/SecondStep'
import Complete from '../components/Complete'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'


class CreateContainer extends Component {
  state={
    page: 1,
    appLogo:'',
    appTages:[],
    appId:0,
    fileObj:{},
    imgUrl:"",
    checked: [],
    initialValue:{}
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
    const url = getDomain(
      "http://api.intra.",
      "ffan.net/bo/v1/web/developer/app"
    )
    try{
      const res = await fetchUtil.postJSON(url,data,{"type":"formData"})
      if (res.status == 200) {
        const id = res.data.app.appId;
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
  secondPageSubmit = async (values) => {
    // Do something with the form values
    const verUrl = getDomain(
      "http://api.intra.",
      "ffan.net/bo/v1/web/developer/app/" + this.state.appId + "/code"
    )
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
    for (var key in fileList) {
      if (fileList[key]) {
        verData.append(key, fileList[key])
      }
    }
    verData.append("codeDesc", values.codeDesc)
    try {
      const codeRes = await fetchUtil.postJSON(url, verData, { "type": "formData" })
      if (codeRes.status == 200) {
        this.nextPage()
      } else {
        alert("服务端验证不通过，请进一步核对信息")
      }
    } catch (e) {
      alert(e.msg)
      console.log(e)
    }
  }

   async componentDidMount() {
     const appId = 111
     if(appId){
       const url = getDomain(
         "http://api.intra.",
         'ffan.net/bo/v1/web/app/' + appId
       )
       const res = await fetchUtil.getJSON(url)
       const initialValue = {
         "appName": res.data.appName,
         "appDesc": res.data.appDesc,
         "categoryId": res.data.categoryId
       }
       this.setState({imgUrl:res.data.appLogo,checked:res.data.tags,initialValue:initialValue})
     }
   }

  render() {
    const { page, initialValue, checked, imgUrl } = this.state;
    console.log(imgUrl)
    return (
      <div>
        <Step page={page}/>
        {
          page === 1 && 
            <FirstStep 
              onSubmit={this.firstPageSubmit} 
              getParams={::this.onGetParams} 
              getImgSrc={::this.getImgUrl}
              initialValues={initialValue}
              initImgUrl={imgUrl}
              initCheckedTags={checked}
            />
        }
        {
          page === 2 && 
            <SecondStep 
              previousPage={this.previousPage} 
              onSubmit={this.secondPageSubmit} 
              getParams={::this.fileSelected}
            />
        }
        {
          page === 3 && 
          <Complete previousPage={this.previousPage}/>
        }
      </div>
    );
  }
}


export default CreateContainer;
