import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { validate, warn } from '../modules/validate'
import { test } from '../modules/create'

import FirstStepForm from '../components/FirstStepForm'
import SecondStepForm from '../components/SecondStepForm'
import Complete from '../components/Complete'
import Step from '../components/Step'

import { getDomain } from '../../../../utils/domain'
import fetchUtil from '../../../../utils/fetchUtil'

import { toggleStep, submitCreateForm, fetchTags, fetchCates,
  toggleTag, updateForm2 } from '../modules/create'

class CreateContainer extends Component {

  async componentDidMount() {
    // console.log("props:", this.props);
    this.props.fetchTags()
    this.props.fetchCates()
  }

  imageUpload(e) {
    // return console.log("imageUpload");

    const url = getDomain("http://api.intra.","ffan.net/bo/v1/web/photo/upload")
    const formData = new FormData()
    formData.append('fileName', e.target.files[0])

    fetchUtil.postJSON(url, formData, {
      jsonStringify: false 
    }).then(res=>{
      console.log(`Upload Success: `, res)
      // do something
    }).catch(e=>{
      console.log(`Upload Failed.`)
      // do something
    })
  }

  fileUpload(e) {
    console.log(e);
  }

  submitFirstForm(values) {

    console.log(values);

    const formData = new FormData();

    for(let key in values) {
      if(key == 'tags') {
        for(let v of values[key]){
          formData.append('tags[]', v)
        }
      } else {
        formData.append(key, values[key])
      }
    }

    this.props.submitCreateForm(formData).then(()=>{
      this.props.toggleStep(2);
    });
  }

  submitSecondForm(values) {
    console.log(values);

    // Do something with the form values
    const url = getDomain(
      `http://api.intra.`,`ffan.net/bo/v1/web/hardware/addHardware/step2`
    )

    const formData = new FormData();

    for(let key in values) {
      formData.append(key, values[key]);
    }

    formData.append('fileName', values['originalName']);
    formData.append('fileLink', values['url']);
   
    // return this.props.toggleStep(3);

    fetchUtil.postJSON(url, formData, {jsonStringify: false}).then(res=>{
      if (res.status == 200) {
        this.props.toggleStep(3);
      } else {
        console.warn(res);
      }
    })
  }

  render() {
    const { toggleStep, toggleTag, create } = this.props;
    const { page, tags, cates, form, form2 } = create;

    return (
      <div>
        <Step page={page}/>
        {
          page === 1 && 
            <FirstStepForm 
              onSubmit={::this.submitFirstForm} 
              imageUpload={::this.imageUpload}
              toggleTag={toggleTag}
              tags={tags}
              cates={cates}
              initialValues={form}
            />
        }
        {
          page === 2 && 
            <SecondStepForm 
              previousPage={()=>toggleStep(1)} 
              updateForm={this.props.updateForm2}
              onSubmit={::this.submitSecondForm} 
              initialValues={form2}
            />
        }
        {
          page === 3 && 
          <Complete />
        }
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleStep,
  toggleTag,
  submitCreateForm,
  fetchTags,
  fetchCates,
  updateForm2
}

const mapStateToProps = ({ create }) => ({
  create,
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer)
