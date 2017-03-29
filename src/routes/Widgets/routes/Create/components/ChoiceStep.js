import React, { Component, PropTypes } from 'react'
import { connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import './firstStepForm.scss'

class ChoiceStepForm extends Component {
  
  handleSubmit(val) {
    this.props && this.props.onSubmit && this.props.onSubmit(val)
  }

  render() {
    return (
      <form className="create-choice-block">
        <p className="create-choice-title">创建新组件</p>
        <div className="create-form-btn">
          <h3 className="title">请选择组件类型</h3>
          <button type="button" className="next rn-btn" onClick={this.handleSubmit.bind(this, 0)}><i className="iconfont icon-download_react-native"></i>FAP小程序</button>
          <button type="button" className="next h5-btn" onClick={this.handleSubmit.bind(this, 1)}><i className="iconfont icon-html5"></i>HTML5</button>
        </div>
      </form>
    )
  }
}

ChoiceStepForm.propTypes = {
  onSubmit : PropTypes.func.isRequired,
}

export default connect(
)(reduxForm({
  form: 'createAppChoiceStep',
  fields: [],
  forceUnregisterOnUnmount: true,
})(ChoiceStepForm))



