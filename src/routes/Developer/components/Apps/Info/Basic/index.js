import React from 'react'
import './index.scss'
import Tags from '../../../../../../components/Tags'
import fetch from '../../../../../../../fetch'

const unique1 = function(arr){
	var n = []; 
	for(var i = 0; i < arr.length; i++) {
		if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
	}
	return n;
}

class Basic extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: [
        {id: 0, name: '标签一'},
        {id: 1, name: '标签二'},
        {id: 2, name: '标签三'},
        {id: 3, name: '标签四'},
        {id: 4, name: '标签五'},
        {id: 5, name: '标签六'},
        {id: 6, name: '标签七'},
      ],
      imgUrl:""
    };
  }
   
   async imgUpload(){
    let data = new FormData()
    data.append('fileName', this.refs.appLogo.files[0])
    data.append('width', 640)
    const url ="http://api.intra.sit.ffan.net/bo/v1/web/photo/upload";
    const imgObj = await fetch(url, {
      method: "POST",
      body: data
    })
    const img = await imgObj.json();
    const imgUrl = img.data.url
    //console.log(imgUrl)
    this.setState({imgUrl:imgUrl})
  }
  handleCheck(CheckedArr){
    const tags = unique1(CheckedArr)
    this.props.onFinish(this.state.imgUrl,tags)
  }
  render() {
    return (
      <fieldset className="form-container clx">
        <div className="form-group col-md-12">
          <label className="col-md-2">商家应用名称:</label>
          <input className="form-control col-md-10" type="text" placeholder="应用名称" name="appName"/>
        </div>
        <hr/>
        <div className="form-group col-md-12">
          <label>文字介绍:</label>
          <textarea className="form-control" rows="3" name='appDesc'></textarea>
        </div>
        <div className="form-group col-md-12">
          <label>选择LOGO:</label>
          <div className="img-container">
            <img src={this.state.imgUrl} alt="上传图片"  className="img-thumbnail"/>
          </div>
          <div>
            <span className="sl-custom-file">
              <input type="button" className="btn btn-primary" value="选择图片"/>
              <input type="file" className="ui-input-file" accept="image/*" ref='appLogo' onChange={this.imgUpload.bind(this)}/>
            </span>
          </div>
        </div>
        <div className="form-group col-md-12">
          <label>分类:</label>
          <select className="form-control" name='appOption'>
            <option value="1">分类1</option>
            <option value="2">分类2</option>
            <option value="3">分类3</option>
            <option value="4">分类4</option>
            <option value="5">分类5</option>
          </select>
        </div>
        <div className="form-group col-md-12">
          <label>产品标签:</label>
          <Tags data={this.state.tags} onChecked={::this.handleCheck}/>
        </div>
      </fieldset>
    )
  }
}

export default Basic;
