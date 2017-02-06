import React, { Component, PropTypes } from 'react'
import { connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import './style.scss'

class ChoiceStepForm extends Component {
  
  handleSubmit(val) {
    this.props && this.props.onSubmit && this.props.onSubmit(val)
  }

  render() {
    return (
      <form>
        <div className="form-btn">
          <div>
            <button type="button" className="next" onClick={this.handleSubmit.bind(this, 0)}>创建RN应用</button>
            <button type="button" className="next" onClick={this.handleSubmit.bind(this, 1)}>创建H5应用</button>
          </div>
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



