import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderField, renderSelect, renderTextarea } from './renderField'
import { validate }  from '../modules/validate'
import fetchUtil from '../../../../utils/fetchUtil'
import Tags from '../../../../../components/Tags'
// import '../../Apps/components/firstStep.scss'
import { getDomain } from '../../../../utils/domain'

class HardwareFirstPage extends React.Component {
  state = {
    categorys: [],
    categoryChilds: [],
    tags: [],
    imgUrl: ''
  }
  async getCategory() {
    const apiUrl = getDomain(
      "http://api.intra.",
      "ffan.net/bo/v1/web/hardware/getCategory"
    );
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if(res.status === 200){
        res.data && res.data.list && this.setCategorys(res.data.list)
      } else {
        res.msg && window.alert(res.msg);
      }
    } catch (e) {
      console.log(e)
    }
  }
  setCategorys(listData) {
    const categorys = this.transformCategorys(listData);
    this.setCategoryChilds(categorys);
  }
  setCategoryChilds(categorys) {
    for (let i=0; i<categorys.length; i++) {
      categorys[i].categoryChilds = this.transformCategorys(categorys[i].categoryChilds);
    }
    // categorys.unshift({key: 0, value: "请选择", categoryChilds: [{key: 0, value: "请选择"}]})
    this.setState({
      categorys: categorys, 
      categoryChilds: categorys[0].categoryChilds
    })
  }
  transformCategorys(listData) {
    let newCategory = [];
    for (let i=0; i<listData.length; i++) {
      let obj = listData[i];
      obj.key = listData[i].categoryId;
      obj.value = listData[i].categoryName;
      this.categoryChilds = listData[i].categoryChilds;
      newCategory.push(obj);
    }
    return newCategory;
  }
  getCategoryChilds(key) {
    let { categorys } = this.state;
    for (let i=0; i<categorys.length; i++) {
      // categorys[i].categoryChilds.unshift({key: 0, value: "请选择"})
      if (parseInt(categorys[i].key) === parseInt(key)) {
        this.setState({categoryChilds: categorys[i].categoryChilds});
        return
      } else {
        this.setState({categoryChilds: []})
      }
    }
  }
  changeCategory() {
    let key = this.refs.majorCategoryId.value;
    if (key) {
      this.getCategoryChilds(key)
      this.props.onChangeCategory(key)
    }
  }

  async getTags() {
    const apiUrl = getDomain(
      "http://api.intra.",
      "ffan.net/bo/v1/public/app/tags"
    );
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
    const url = getDomain(
      "http://api.intra.",
      "ffan.net/bo/v1/web/photo/upload"
    );
    const imgInfo = await fetchUtil.postJSON(url, formData, {"type": "formData"});
    console.log("imgUpload ", imgInfo);
    if (imgInfo.data && imgInfo.data.url) {
      this.props.onSelectLogo(imgInfo.data.url);
      this.setState({imgUrl: imgInfo.data.url});
    }
  }
  tagsChecked(tags) {
    tags && this.props.onTagChange(tags)
  }
  render() {
    console.log("props ", this.props);
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
        <Field name="hardwareFunction" label="硬件介绍" component={renderTextarea} />
        <div>
          <label>分类</label>
          <div>
            <select name="majorCategoryId" ref="majorCategoryId" onChange={this.changeCategory.bind(this)}>
             <option>请选择</option>
              {
                categorys.map( (item, index) => {
                  return ( <option key={item.key} value={item.key}>{item.value}</option> )
                })
              }
            </select>
          </div>
        </div>
        {/*<Field name="majorCategoryId" label="分类" component={renderSelect} ref="majorCategoryId" options={categorys} onChange={this.changeCategory.bind(this)} />*/}
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

HardwareFirstPage = reduxForm({
  form: 'hardware',            
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
})(HardwareFirstPage)

export default HardwareFirstPage