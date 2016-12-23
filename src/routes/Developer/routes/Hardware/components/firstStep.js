import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderField, renderSelect, renderTextarea } from './renderField'
import { validate }  from '../modules/validate'
import fetchUtil from '../../../../utils/fetchUtil'
import fetch from '../../../../../../fetch'
import Tags from '../../../../../components/Tags'
import '../../Apps/components/firstStep.scss'


class HardwareFirstPage extends React.Component {
  state = {
    categorys: [],
    categoryChilds: [],
    tags: [],
    imgUrl: ''
  }
  async getCategory() {
    console.log("getCategory")
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/hardware/getCategory`;
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if(res.status === 200){
        let result = [];
        for (var i in res.data.list) {
          result.push(res.data.list[i]);
        }
        console.log("result ", result)
        res.data && res.data.list && this.setState({ categorys: result })
      } else {
        res.msg && window.alert(res.msg);
      }
    } catch (e) {
      console.log(e)
    }
  }
  async getTags() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/public/app/tags`;
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if(res.status === 200){
        res.data && this.setState({ tags: res.data })
      } else {
        res.msg && window.alert(res.msg);
      }
    } catch (e) {
      console.log(e)
    }
  }
  async componentDidMount() {
    try {
      await this.getCategory();
      await this.getTags();
    } catch (e) {
      console.log(e)
    }
  }
  async imgUpload(e) {
    const hardwareLogo = e.target.files ? e.target.files[0] : '';
    if (!hardwareLogo) return;
    let formData = new FormData()
    formData.append('fileName', hardwareLogo)
    const url = `http://api.intra.sit.ffan.net/bo/v1/web/photo/upload`
    const res = await fetch(url, {
      method: "POST",
      body: formData
    });
    const imgObj = await res.json();
    if (imgObj.data && imgObj.data.url) this.setState({imgUrl: imgObj.data.url});
  }
  tagsChecked() {

  }
  render() {
    const { handleSubmit } = this.props
    const { categorys, categoryChilds, tags, imgUrl } = this.state
    return (
      <form onSubmit={handleSubmit}>
        <Field name="hardwareName" type="text" label="硬件名称" component={renderField} />
        <div>
        	<label>硬件LOGO</label>
        	<div>
        		<p>请上传硬件高清图片</p>
				    <p>400*400像素，仅支持PNG格式，大小不超过300KB</p>
            <span>
              <input type="button" value="选择文件"/>
              <input type="file" accept=".png" ref="hardwareLogo" onChange={this.imgUpload.bind(this)}/>
            </span>
        		<div className="img-container">
              <img src={imgUrl} alt="上传图片"  className="img-thumbnail"/>
            </div>
        	</div>
        </div>
        <Field name="hardwareDesc" label="硬件介绍" component={renderTextarea} />
        <Field name="majorCategoryId" label="分类" component={renderSelect} options={categorys}/>
        <Field name="minorCategoryId" component={renderSelect} options={categoryChilds}/> 
        <div>
          <label>标签</label>
          <Tags data={tags} onChecked={this.tagsChecked.bind(this)}/>
        </div>
        <div className="btn_submit">
          <button type="submit" className="next">保存并下一步</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'hardware',            
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
  // asyncValidate,
  // asyncBlurFields: [ 'username' ]
})(HardwareFirstPage)