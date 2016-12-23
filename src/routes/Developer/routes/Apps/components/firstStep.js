import React from 'react'
import { Field, reduxForm } from 'redux-form'
import renderField, { renderTextArea, renderSelect, renderFile}from './renderField'
import { validate, asyncValidate, repeatCheck }  from '../modules/validate'
import Tags from '../../../../../components/Tags'
import './firstStep.scss'
import fetch from '../../../../../../fetch'
import fetchUtil from '../../../../utils/fetchUtil'

const unique1 = function(arr){
	var n = []; 
	for(var i = 0; i < arr.length; i++) {
		if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
	}
	return n;
}
class WizardFormFirstPage extends React.Component {
  
  state = {
    tags: [
      { tagId: 0, tagName: '数据丢失' },
    ],
    optionArr:[
      {categoryId:0,categoryName:"数据丢失"}
    ],
    imgUrl: ""
  }

  async imgUpload(e) {
    let data = new FormData()
    data.append('fileName', e.target.files[0])
    const url = "http://api.intra.sit.ffan.net/bo/v1/web/photo/upload";
    const imgObj = await fetch(url, {
      method: "POST",
      body: data
    })
    const img = await imgObj.json();
    const imgUrl = img.data.url
    //console.log(imgUrl)
    this.setState({ imgUrl: imgUrl })
    this.props.getImgSrc(imgUrl)
  }

  async componentDidMount() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/public/app/categories`;
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if(res.status === 200){
        this.setState({optionArr:res.data.list})
      }
    } catch (e) {
      alert('失败')
      console.log(e)
    }
    const tagsUrl = 'http://api.intra.sit.ffan.net/bo/v1/public/app/tags'
    try {
      const tagsRes = await fetchUtil.getJSON(tagsUrl);
      if(tagsRes.status === 200){
        this.setState({tags:tagsRes.data})
      }
    } catch (e) {
      alert('失败')
      console.log(e)
    }
  }

  handleCheck(CheckedArr) {
    const tags = unique1(CheckedArr)
    this.props.getParams(tags)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field name="appName" type="text" component={renderField}
          label="应用名称"
          />
        <div>
        	<label>应用图片</label>
        	<div>
        		<p>请上传应用高清图片</p>
				<p>400*400像素，仅支持PNG格式，大小不超过300KB</p>
			    <span>
			      <input type="button" value="选择文件"/>
			      <input type="file" accept="image/*" ref='appLogo' onChange={this.imgUpload.bind(this)}/>
			    </span>
        		<div className="img-container">
			      <img src={this.state.imgUrl} alt="上传图片"  className="img-thumbnail"/>
			    </div>
        	</div>
        </div>
        <Field name="appDesc" type="text" component={renderTextArea}
          label="应用简介"
          />
        <Field name="categoryId" component={renderSelect} label="分类:" optionArr={this.state.optionArr} />
        <div>
          <label>产品标签</label>
          <Tags data={this.state.tags} onChecked={::this.handleCheck}/>
        </div>
        <div className="btn_submit">
          <button type="submit" className="next">下一步</button>
        </div> 
      </form>
    )
  }
}

export default reduxForm({
  form: 'wizard',              // <------ same form name
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
})(WizardFormFirstPage)


