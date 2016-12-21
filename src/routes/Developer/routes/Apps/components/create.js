import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { validate, warn } from '../modules/validate'
import renderField, { renderTextArea } from '../components/renderField'

import WizardFormFirstPage from './firstStep'
import WizardFormSecondPage from './secondStep'


const Step = (props)=>(
  <div>{props.children}</div>
)


class ContactForm extends Component {
  state = {
    page: 1
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

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    
    return (
      <div>
        <Step>{this.state.page}</Step>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage}/>}
        {page === 2 && <WizardFormSecondPage previousPage={this.previousPage} onSubmit={onSubmit}/>}
      </div>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default ContactForm;

