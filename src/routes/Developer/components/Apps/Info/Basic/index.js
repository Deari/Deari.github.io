import React from 'react'
import './index.scss'
import Tags from '../../../../../../components/Tags'
import fetchUtil from '../../../../../utils/fetchUtil'
import fetch from '../../../../../../../fetch'
const querystring = require('querystring');

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
      ]
    };
  }
   imgUpload(){
    var data = new FormData()
    data.append('fileName', this.refs.appLogo.files[0])
    data.append('width', 640)
    const url ="http://api.intra.sit.ffan.net/bo/v1/web/photo/upload";
    const img =  fetch(url, {
      method: "POST",
      body: data
    })
    img.then(function(data){
      console.log(data)
    })
    console.log()
  }

  render() {
    return (
      <fieldset className="form-container clx">
        <div className="form-group col-md-12">
          <label className="col-md-2">商家应用名称:</label>
          <input className="form-control col-md-4" type="text" placeholder="应用名称" name="appName"/>
        </div>
        <hr/>
        <div className="form-group col-md-12">
          <label>文字介绍:</label>
          <textarea className="form-control" rows="3" name='appDesc'></textarea>
        </div>
        <div className="form-group col-md-12">
          <label>选择LOGO:</label>
          <div className="img-container">
            <img src="" alt="上传图片"  className="img-thumbnail"/>
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
            <option>分类1</option>
            <option>分类2</option>
            <option>分类3</option>
            <option>分类4</option>
            <option>分类5</option>
          </select>
        </div>
        <div className="form-group col-md-12" name='appTit'>
          <label>产品标签:</label>
          <Tags data={this.state.tags} />
        </div>
      </fieldset>
    )
  }
}

export default Basic;
